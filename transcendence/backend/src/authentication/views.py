from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# 이 파일은 Django REST framework를 사용하여 인증 기능을 구현하는 views 파일입니다.
# 회원가입 및 로그인 요청을 처리합니다.

class RegisterView(APIView):
    # 회원가입 요청을 처리하는 클래스입니다.
    def post(self, request):
        # 요청으로부터 받은 데이터를 RegisterSerializer로 변환합니다.
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            # 데이터가 유효한 경우, 사용자 정보를 저장합니다.
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # 데이터가 유효하지 않은 경우, 에러 메시지를 출력하고 400 상태 코드를 반환합니다.
            print("Register Error: ", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    # 로그인 요청을 처리하는 클래스입니다.
    def post(self, request):
        print("Login request data: ", request.data)  # 로그인 요청 데이터를 출력
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            # 이메일로 사용자 객체를 가져옵니다.
            user = User.objects.get(email=email)
            username = user.username
            # 사용자 이름과 비밀번호로 인증합니다.
            user = authenticate(username=username, password=password)
        except User.DoesNotExist:
            # 사용자가 존재하지 않는 경우
            user = None

        if user is not None:
            # 로그인 성공 시, 토큰을 생성하거나 기존 토큰을 가져옵니다.
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            # 로그인 실패 시, 401 상태 코드와 함께 에러 메시지를 반환합니다.
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
