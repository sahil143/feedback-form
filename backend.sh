echo '------- install , pipenv ----------'
pip3 install virtualenv pipenv
wait 

# create virtualenv
echo '------- create virtualenv ----------'
virtualenv .venv
wait

# activate virtualenv
echo '------- activate virtualenv ----------'
source ./.venv/bin/activate
wait

# install python packages
echo '------- install packages ----------'
pipenv install
wait 

cd backend

# initialize django project

python3 manage.py makemigrations feedback_form
wait 
python3 manage.py migrate
wait 
python3 manage.py runserver




