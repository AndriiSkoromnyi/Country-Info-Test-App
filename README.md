Country Info App




Angular application to explore countries, view public holidays, and navigate neighboring countries using the Nager.Date API
.

Features

Home Page

Search countries by name.

List all countries fetched from Nager.Date API.

Random countries widget showing 3 random countries and their next upcoming holiday.

Navigation to country details via clickable links.

Country Page

Display public holidays for selected country and year (2020–2030).

Switch years to view holidays in different years.

Show neighboring countries as clickable chips.

Holiday details include date, name, and type.

Styling

Light and dark theme support.

Minimalistic and responsive design.

Development server

To start a local development server:

ng serve


Open your browser at http://localhost:4200/.
The application will automatically reload whenever you modify the source files.

Code scaffolding

Generate new components using Angular CLI:

ng generate component component-name


For a complete list of available schematics:

ng generate --help

Building the project

To build the project for production:

ng build


This will compile your project into the dist/ folder.

Running unit tests

To execute unit tests with Karma
:

ng test

Running end-to-end tests

For e2e testing:

ng e2e

Environment Variables

You can configure the API base URL (optional):

window.__runtime_env__ = {
  NAGER_BASE_URL: 'https://date.nager.at'
};


By default, the app uses the public Nager.Date API.

Project Structure
src/
├─ app/
│  ├─ home/                  # Home page component
│  ├─ country/               # Country page component
│  ├─ random-countries/      # Random countries widget
│  └─ services/              # API service
├─ styles.css                # Global styles and theming

Usage

Search for a country on the Home page.

Click on a country to see its holidays.

Switch years on the Country page to view holidays for different years.

Explore neighboring countries via chips.

Check 3 random countries’ next holiday in the Random Countries widget.

Additional Resources

Angular Documentation

Nager.Date API

License

This project is for educational/test purposes.
