from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Post
from .serializers import PostSerializer


@api_view(['GET', 'POST'])
def get_all_create_post(request):
    if request.method == 'GET':
        try:  
            posts = Post.objects.order_by('-created_datetime')
            serializer = PostSerializer(posts, many=True)
            if (len(serializer.data) == 0):
                return Response({'message': 'Post not found'}, status=status.HTTP_204_NO_CONTENT)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if (serializer.is_valid()):

            try:
             
                user = User.objects.get(username=serializer.validated_data['username'])
                post = serializer.save(username=user.username)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['PATCH', 'DELETE'])
def update_delete_post(request, post_id):
    if request.method == 'PATCH':
        try:
            post = Post.objects.get(id=post_id)

        except post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PostSerializer(post, data=request.data, partial=True)
        
        if (serializer.is_valid()):
            serializer.save()
         
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        post.delete()
        return Response({'message': f'The post "{post.title}" was successfully deleted'}, status=status.HTTP_204_NO_CONTENT)
