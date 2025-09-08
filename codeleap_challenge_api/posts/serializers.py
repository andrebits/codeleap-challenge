from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Post

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'title', 'username', 'content', 'created_datetime']
        read_only_fields = ['id', 'created_datetime']