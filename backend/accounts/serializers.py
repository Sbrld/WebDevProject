from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model() #used to extend from abstract class

#serializers #1 - Register
class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    email = serializers.EmailField() #required=True | add in last
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError('Passwords do not match')
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError('Username already exists')
        if user.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError('Email already exists')
        return data

    def create(self, validated_data):
        validated_data.pop('password2') #to delete useless info
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

#serializers #2 - Login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

#ModelSerializer - User Profile
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'phone', 'avatar', 'created_at', 'updated_at']
        read_only_fields = ['id','username' , 'created_at']