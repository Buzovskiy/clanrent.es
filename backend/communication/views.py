from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import CallBackSerializer


@api_view(['POST'])
def request_callback(request):
    serializer = CallBackSerializer(data=request.data)
    if serializer.is_valid():
        serializer.send_notification()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
