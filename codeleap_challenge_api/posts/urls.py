from django.urls import path
from .views import get_all_create_post,update_delete_post

urlpatterns = [
    path('', get_all_create_post, name = 'get_all_create_post'), # GET / POST
    path('<int:post_id>/', update_delete_post, name='update_post'), # PATCH / DELETE
  
]