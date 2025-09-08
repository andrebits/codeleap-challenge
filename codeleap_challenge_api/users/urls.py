from django.urls import path
from .views import register_user

urlpatterns = [

    # user
    path('user/signup/', register_user, name = 'register_user'), # POST

]