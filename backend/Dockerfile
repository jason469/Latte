FROM python:3.10-alpine

ENV PYTHONUNBUFFERED 1

RUN apk update \
   && apk add postgresql-dev gcc python3-dev musl-dev

COPY ./requirements.txt ./
RUN pip install -r requirements.txt --upgrade pip pipenv

WORKDIR /api
COPY ./Pipfile* ./
RUN pipenv lock
RUN pipenv sync

COPY . .

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod o+x /entrypoint.sh

ENTRYPOINT ["sh", "-c", "/entrypoint.sh"]