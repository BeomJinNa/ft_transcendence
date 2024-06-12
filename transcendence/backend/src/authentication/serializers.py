from rest_framework import serializers
from django.contrib.auth.models import User

# 이 파일은 Django REST framework의 시리얼라이저를 정의하는 파일입니다.
# 시리얼라이저는 데이터의 유효성을 검사하고, 
# 복잡한 데이터 유형(querysets 및 모델 인스턴스 등)을 JSON 등의 컨텐츠 유형으로 쉽게 렌더링할 수 있도록 합니다.

class RegisterSerializer(serializers.ModelSerializer):
    # 회원가입에 사용할 시리얼라이저 클래스입니다.
    class Meta:
        model = User  # User 모델을 기반으로 합니다.
        fields = ['username', 'email', 'password']  # 포함할 필드를 정의합니다.
        extra_kwargs = {'password': {'write_only': True}}  # 비밀번호 필드는 쓰기 전용으로 설정합니다.

    def create(self, validated_data):
        # 유효성 검사를 마친 데이터로 새로운 User 인스턴스를 생성합니다.
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    # 로그인에 사용할 시리얼라이저 클래스입니다.
    email = serializers.EmailField()  # 이메일 필드
    password = serializers.CharField(write_only=True)  # 비밀번호 필드 (쓰기 전용)
