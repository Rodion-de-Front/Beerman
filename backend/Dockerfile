FROM python:3.10

WORKDIR /beerman/backend

COPY requirements.txt ./

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY ./app /beerman/backend/app

CMD ["python3.10", "-m", "app"]