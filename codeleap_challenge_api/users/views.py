from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
# from .models import Post, Comment
from django.contrib.auth.models import User
from .serializers import UserSerializer
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiRequest
from django.urls import reverse


##### Users ##### 
@extend_schema(
        request=OpenApiRequest(
            UserSerializer,
            examples=[
                OpenApiExample(
                    name='User Registration Example',
                    value={
                        'username': 'jane_doe',
                        'email': 'jane@example.com',
                        'password': 'StrongPass123'
                    },
                    request_only=True
                )
            ]
        ),
        description='Register a new user', responses=UserSerializer(many=True))
@permission_classes([AllowAny])
@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 