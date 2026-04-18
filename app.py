"""
Digital Wellness Intelligence Platform - entrypoint

This file creates the Flask app using the app factory and runs the
development server. For production deployments, use a WSGI server
such as gunicorn or uWSGI and set appropriate environment variables.
"""

from app import create_app


# Main function to create the Flask app and run the development server
def main():
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)


# Standard Python entry point guard to run the main function when the script is executed directly
if __name__ == '__main__':
    main()
