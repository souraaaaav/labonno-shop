
from authentication.models import ( User,Product, Package, Order, OrderProduct, PackageOrder, PackageOrderProduct )
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.html import strip_tags
from jwt import ExpiredSignatureError, decode, encode, exceptions
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from . import utils
from .serializers import LoginSerializer, UserSerializer,ProductSerializer, PackageSerializer, OrderSerializer, PackageOrderSerializer

class passwordChangeRequestView(generics.GenericAPIView):

    def post(self,request, *args, **kwargs):
        
        try:
            user_data = User.objects.get(email=request.data['email'])
         
            fullName=user_data.name
           
            token = encode({'id': user_data.id},
                        settings.SECRET_KEY, algorithm='HS256')

            absurl = utils.FRONTEND_URL + "forget-password-confirm?token=" + str(token)

            html_message = render_to_string('password_reset_template.html', {
                'fullname': fullName,
                'confirmationUrl': absurl
            })
            plain_message = strip_tags(html_message)
            send_mail(
                "Email Confirmation for password change",
                plain_message,
                utils.EMAIL_ADDRESS,
                [user_data.email],
                html_message=html_message
            )

            return Response({"message": "Account created successfully"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)

class PasswordChangeConfirmView(generics.GenericAPIView):
    def post(self,request, *args, **kwargs):
        try:
            token = request.data['token']
            password = request.data['password']
            payload = decode(token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(id=payload['id'])
            user.set_password(password)
            user.save()
            return Response({'message': "Successfully changed the password"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)


   

class userSignupView(generics.GenericAPIView):
    
    def post(self, request, *args, **kwargs):
        try:
            name=request.data['name']
            email=request.data['email']
            phone = request.data['phone']
            password=request.data['password']
            profile_pic = request.FILES.get('profile_pic')
            print(request.FILES,profile_pic)
            user=User.objects.create(email=email,name=name,phone=phone,profile_pic=profile_pic)
            user.set_password(password)
            user.save()

            user_data = User.objects.get(email=email)

            token = encode({'id': user_data.id},
                        settings.SECRET_KEY, algorithm='HS256')
            current_site = get_current_site(request).domain
            relative_link = reverse('email-verify')
            absurl = 'http://' + current_site + \
                relative_link + "?token=" + str(token)
            print(1)
            html_message = render_to_string('registration_confirm.html', {
                'fullname': name,
                'confirmationUrl': absurl
            })

            plain_message = strip_tags(html_message)
            send_mail(
                "Email Confirmation for Labonno's Store Registration",
                plain_message,
                utils.EMAIL_ADDRESS,
                [user_data.email],
                html_message=html_message
            )

            return Response({"message": "Account created successfully"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmail(generics.GenericAPIView):

    @staticmethod
    def get(request):
        token = request.GET.get('token')
        try:
            payload = decode(token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(id=payload['id'])
            if user.is_verified is False:
                user.is_verified = True
                user.save()
            return redirect(utils.FRONTEND_URL+"login/?came_from=verified")

        except ExpiredSignatureError:
            return Response({'message': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)

        except exceptions.DecodeError:
            return Response({'message': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)


class customAuthToken(generics.GenericAPIView):

    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })


class LogoutView(APIView):
    def post(self, request, format=None):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)


class continuousVerificationView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

class ProductListPagination(PageNumberPagination):
    page_size = 6  # Adjust as needed
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductList(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductListPagination

    def get_queryset(self):
        queryset = Product.objects.all()

        product_type = self.request.query_params.get('product_type', None)
        if product_type is not None and product_type != 'All':
            queryset = queryset.filter(product_type=product_type)

        search_term = self.request.query_params.get('search', None)
        if search_term is not None:
            queryset = queryset.filter(name__icontains=search_term)

        return queryset
from rest_framework.generics import RetrieveAPIView

class ProductDetail(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class PackageList(generics.ListAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class PackageDetail(RetrieveAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

from rest_framework.decorators import api_view,permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        user = request.user
        data = request.data

        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        bill = data.get('bill')
        payment_id = data.get('payment_id')
        total_price=data.get('total_price')
        cart_items = data.get('cart_items', []) 

        print(data)
        
        order = Order.objects.create(
            user=user,
            name=name,
            address=address,
            phone=phone,
            bill=bill,
            payment_id=payment_id,
            total_price=total_price
        )

        for item in cart_items:
            product_id = item['product_id']
            quantity = item['quantity']
            product_instance = get_object_or_404(Product, id=product_id)
            order_product = OrderProduct.objects.create(
                    order=order,
                    product=product_instance,
                    quantity=quantity
                )

        serializer = OrderSerializer(order)
        ordered_items = OrderProduct.objects.filter(order=order)

        html_message = render_to_string('order_confirm.html', {
                'fullname': user.name,
                'payment_id': payment_id,
                'total_price': total_price,
                'ordered_items': ordered_items
            })
        plain_message = strip_tags(html_message)
        send_mail(
                "Invoice of Labonno Shop",
                plain_message,
                utils.EMAIL_ADDRESS,
                [user.email],
                html_message=html_message
            )
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_package_order(request):
    try:
        user = request.user
        data = request.data

        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        bill = data.get('bill')
        payment_id = data.get('payment_id')
        total_price=data.get('total_price')
        package_order=data.get('package_order')
        cart_items = data.get('cart_items', []) 

        print(data)
        
        order = PackageOrder.objects.create(
            user=user,
            name=name,
            address=address,
            phone=phone,
            bill=bill,
            payment_id=payment_id,
            total_price=total_price,
            package=Package.objects.get(pk=package_order)
        )

        for item in cart_items:
            product_id = item['product_id']
            quantity = item['quantity']
            product_instance = get_object_or_404(Product, id=product_id)
            order_product = PackageOrderProduct.objects.create(
                    package_order=order,
                    product=product_instance,
                    quantity=quantity
                )

        serializer = PackageOrderSerializer(order)

        ordered_items = PackageOrderProduct.objects.filter(package_order=order)

        html_message = render_to_string('order_confirm.html', {
                'fullname': user.name,
                'payment_id': payment_id,
                'total_price': total_price,
                'ordered_items': ordered_items,
                'package_name':Package.objects.get(pk=package_order).name
            })
        plain_message = strip_tags(html_message)
        send_mail(
                "Invoice of Labonno Shop",
                plain_message,
                utils.EMAIL_ADDRESS,
                [user.email],
                html_message=html_message
            )
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class UserOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Order.objects.filter(user=user)

        payment_id = self.request.query_params.get('payment_id', None)
        if payment_id is not None:
            queryset = queryset.filter(payment_id__icontains=payment_id)

        return queryset
    
class PackageOrderListAPIView(generics.ListAPIView):
    serializer_class = PackageOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = PackageOrder.objects.filter(user=user)

        payment_id = self.request.query_params.get('payment_id', None)
        if payment_id is not None:
            queryset = queryset.filter(payment_id__icontains=payment_id)

        return queryset