const { getByTitle } = require("@testing-library/dom")

Homepage
- navbar - navbrand & login, signup
- login link
- sign up link

Navbar
- navbrand, companies, jobs, profile, logout user

Sign UP page
Form for sign up axios post
redirects to companies page

Log in page
form for log in axios post
redirects to companies page

/companies
search Bar - get requests to /companies
Company listing - name, description, logo (optional)

/companies/:Company
company name, description
job listings - get title, salary, equity, apply button (will toggle between apply/applied)


/jobs
search bar - get requests to /jobs
job listings- same as above, apply button 

/profile
form - username- first name, last name, email, confirm password, save changes button(post)
- validate on back end

if we go somewhere that user is not authorized, redirect back to home


APP-state: user (either null or user instance)
  - NAVBAR (props user ???)
    - logout navlink should return to homepage and and make user state null
  - ROUTES
    - Homepage ( header Jobly
      All the jobs in one, convenient place.))
        -user? Welcome Back, username! (prop: user)
        -!user? show login and sign up buttons
    ALL NOT LOGGED IN ROUTES    
    - !user REACT /login  AXIOS-/auth/token
      - redirect to /companies
    - !user REACT /signup AXIOS-/auth/register
      - redirect to /companies
    ALL LOGGED IN ROUTES
    - /companies
        - state: search terms : default("")
        - state: [companies]
        - search form onChange/onSubmit 
            - on submit make a get request to /companies?q={searchTerm}
        - or get /companies on no search terms
        - return companies listings using companies state
    - /jobs 
        - state: search terms : default("")
        - state: [jobs]
        - search form onChange/onSubmit 
            - on submit make a get request to /jobs?q={searchTerm}
        - or get /jobs on no search terms
        - return jobs listings using jobs state
    -/profile (props of user)
        - form states : (form values)
        - state JSON response default ("") and we set the state to the last response
        - on submit (return the JSON message as error or success alert)
        - makes patch request to /users/:username
    