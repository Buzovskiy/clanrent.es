from asgiref.sync import async_to_sync
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from telegram import Bot

from backend.api_request import ApiRequest


@api_view(['POST'])
def create_view(request):
    """v1/order/create/"""
    data = request.data.copy()
    # company = ApiRequest(request, url='https://api.rentsyst.com/v1/company/settings').get()
    # We don't pass the location data specified by user because they are not valid
    # We pass valid data
    # data['pickup_location'] = company.json()['locations'][0]['id']
    # data['return_location'] = company.json()['locations'][0]['id']
    r = ApiRequest(request, url='https://api.rentsyst.com/v1/order/create', data=data).post()
    return Response(data=r.json(), status=r.status_code)


@api_view(['POST'])
def update_view(request, order_id=None):
    """v1/order/update/<int:order_id>"""
    data = request.data
    r = ApiRequest(request, url=f'https://api.rentsyst.com/v1/order/update/{order_id}', data=data).post()
    return Response(data=r.json(), status=r.status_code)


@api_view(['POST'])
def confirm_view(request, order_id=None):
    """v1/order/confirm/<int:order_id>"""
    data = request.data
    try:
        send_telegram_order_notification(request, order_id)
    except:
        pass
    r = ApiRequest(request, url=f'https://api.rentsyst.com/v1/order/confirm/{order_id}', data=data).post()
    return Response(data=r.json(), status=r.status_code)


def send_telegram_order_notification(request, order_id):
    order_info = ApiRequest(request, url=f'https://api.rentsyst.com/v1/order/info/{order_id}').get()
    if order_info.status_code == 200:
        order_info = order_info.json()

        client = order_info['customer_data'].get('ReservedForm[title]')
        vehicle = f"{order_info['vehicle'].get('brand')} {order_info['vehicle'].get('mark')}"

        text = f"""
            *Новый заказ!*\n
            id заказа: *{order_info['id']}*;
            продавец: *{'clanrent.es'}*;
            сумма заказа: *{order_info['total_price']}*;
            клиент: *{client}*;
            автомобиль: *{vehicle}*;
            место получения автомобиля: *{order_info['pickup_location']}*;
            место возврата автомобиля: *{order_info['return_location']}*;
            дата начала: *{order_info['pickup_date']}*;
            дата окончания: *{order_info['return_date']}*;
            период аренды: *{order_info['rental_period']}*.
            """
        bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
        async_to_sync(bot.send_message)(
            chat_id=settings.TELEGRAM_GROUP_CHAT_ID,
            text=text,
            parse_mode='markdown',
        )


@api_view(['GET'])
def get_order_info_view(request, order_id):
    """v1/order/info/<int:order_id>"""
    r = ApiRequest(request, url=f'https://api.rentsyst.com/v1/order/info/{order_id}').get()
    return Response(data=r.json(), status=r.status_code)


# This is your test secret API key.
# stripe.api_key = decouple.config('STRIPE_SECRET_KEY')


@api_view(['POST'])
def create_checkout_session(request):
    # """v1/order/create_checkout_session"""
    # data = request.data
    # order_id = data['order_id']
    # total_price = data['total_price']
    #
    # try:
    #     # Create product
    #     product = stripe.Product.create(name=f"Order number: {order_id}")
    #
    #     price = stripe.Price.create(
    #         unit_amount=2005,
    #         currency="eur",
    #         product=product.id,
    #     )
    #
    #     checkout_session = stripe.checkout.Session.create(
    #         line_items=[{'price': price.id, 'quantity': 1}],
    #         mode='payment',
    #         success_url='http://localhost:3000' + '?success=true',
    #         cancel_url='http://localhost:3000' + '?canceled=true',
    #         automatic_tax={'enabled': True},
    #     )
    # except Exception as e:
    #     return str(e)
    #
    # # return redirect(checkout_session.url, code=303)
    #
    # # return Response(data=checkout_session.url, status=200)
    # return Response(data={'url': checkout_session.url})
    pass
