# VoiceThread Presentation Script (5-10 minutes)

**[SLIDE 1 / SCREEN: Tab 1 - Dashboard & List]**
"Hello everyone, my name is Avishka Rajapaksha, and this is my submission for PROG2005 Assessment 3. 
For this project, I significantly expanded my Angular application into a fully robust Ionic native mobile application. The first thing I'd like to highlight is my adherence to User-Centred Design interfaces. I completely designed a fresh 'Enterprise Slate' UI theme. Every component utilises modern typographic contrast, subtle drop shadows, and responsive padding to ensure a professional, highly readable mobile experience."

"Here on Tab 1, you can see all inventory records fetching seamlessly from the REST API. You can search directly by Item Name, and the dashboard automatically calculates live statistics for stock availability."

**[SLIDE 2 / SCREEN: Tab 2 - Add New Item]**
"Moving to Tab 2, this is where we conduct our database `POST` operations. The interface uses native Ionic Form inputs. All fields are rigorously validated, ensuring numbers map correctly and prices enforce standard financial formats before transmission to the remote server."

**[SLIDE 3 / SCREEN: Tab 4 - Privacy & Security]**
"I have also fulfilled the security transparency requirements in Tab 4, documenting data protection details. For further usability, you will notice a floating 'Help Widget' component integrated structurally across all application pages."

**[SLIDE 4 / SCREEN: Tab 3 - Update & Delete]**
"Finally, we arrive at the Update and Delete interface. To verify compliance with the backend's strict architecture, both my PUT and DELETE requests are passing the target string `itemName`, not an arbitrary ID. 

Let's test the mandated security constraint. The backend specifically forbids users from deleting the primary 'Laptop' item. If I search for 'Laptop', select internal delete, and confirm... *[Click confirm in UI here]*... As you can see, the application successfully intercepts the 403 rejection. An error Toast is instantly rendered stating: 'Action Forbidden: The default Laptop item cannot be deleted.' The application maintains total stability without crashing.

Thank you for watching my demonstration."
