# Feedback Form

This project is coded with ❤️ using Django and React(Typescript).

## Demo

![Alt Text](screencast/demo-feed.gif)

## Setup

### Backend

Make sure you have python3 (pip3) installed and run

```sh
./backend.sh # will serve the backend api on localhost:8000/api
```

or follow the steps from `backend.sh` individually

if you face any permission issue run

```
chmod +x ./backend.sh
```

### Frontend

Make sure you have `nodejs(stable)` and `yarn` installed

```sh
./frontend.sh # will serve the frontend on localhost:3000
```

if you face any permission issue run

```
chmod +x ./frontend.sh
```

## Usage

`localhost:3000` will serve the stepper form, On submit user is redirected to `localhost:3000/feedbacks` which lists all the collected feedbacks.

<i>Improvements</i>: Some improvements can be done by providing a specific url for each feedback e.g.: `localhost:3000/feedbacks/:id` and on submit instead of redirecting to `/feedbacks` user can be redirected to the specific feedback e.g.: `/feedback/1`

## Documentation

Backend APIs
```sh
GET /api/feedbacks #to get all the feedbacks
POST /api/feedbacks #to create a new feedback
GET /api/feebacks/1 #to get a specific feedback using id
```

Data Structure
```json
{
  "name": "string",
  "email": "string",
  "phone_number": "number",
  "video": "string", // a Base64 encoded string
  "password": "string"
}
```
## Dependencies

### Backend

This project depends on

```
Django
djangorestframework
django-cors-headers
```

### Frontend

Frontend was built using `create-react-app`. Third party packages apart from packages provided by `create-react-app`.

```
@material-ui/core
@material-ui/icons
react-router
react-webcam
react-hook-form
yup
axios
```

## TODO

- Unit tests for frontend
- Unit tests for backend
- Debug: Why useMediaRecorder hook is not working properly with `<Webcam />`
