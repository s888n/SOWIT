from django.urls import include, path

from . views import RegisterView , LoginView, LogoutView, UserView, GithubLoginView,CookiesRefreshView

urlpatterns = [
    path("refresh/", CookiesRefreshView.as_view(), name="refresh"),
    path("register/",  RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("user/", UserView.as_view(), name="user"),
    path("github/", GithubLoginView.as_view(), name="github"),
] 
