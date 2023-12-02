### Dutu Alin Calin
### SRIC-1B

# DSS-Assignment

## Links
- Deployed app URL (client): https://dutualincalin-dss-assignment-client.onrender.com
- Server:https://dutualincalin-dss-assignment-server.onrender.com

## Assignment components

```
dutualincalin-dss-assignment
├─── backend - Java Spring server
├─── frontend - Next.js client
└─── README.md
```


## Backend component

### API:
- Boards
  - POST api/boards &rarr; Creates a new board
  - GET api/boards &rarr; Returns a list with all the created boards
  - PUT api/boards &rarr; Modifies an existing board
  - DELETE api/boards &rarr; Deletes an existing board identified by given id


- List of cards
  - POST api/cardLists &rarr; Creates a new card list
  - GET api/cardLists &rarr; Returns a list with all the card lists
  - GET api/cardLists/board/{boardId} &rarr; Return a list with all the card lists of the board identified by boardId
  - PUT api/cardLists &rarr; Modifies an existing card list
  - DELETE api/cardLists &rarr; Deletes an existing card list identified by given id


- Cards
  - POST api/cards &rarr; Creates a new card
  - GET api/cards &rarr; Returns a list with all the cards
  - GET api/cards/cardList/{listId} &rarr; Return a list with all the cards of the card list identified by listId
  - PUT api/cards &rarr; Modifies an existing card
  - DELETE api/cards &rarr; Deletes an existing card identified by given id

### Database

The server will connect to a Postgresql database since the app at the moment of submission, it doesn't require a
database with very fast response time such as MongoDb. At the moment the project aims to be used by individuals, however
if the app gains popularity and more users start to use the app, then a database with horizontal scaling will be
required.

### Other details

- There are verification procedures for input received from the frontend component to make sure that data will be
received as expected
- There are exceptions implemented for each case of verification failure which will create a http reply accordingly
- The API was tested using Postman


## Frontend component


### Pages

/ &rarr; The board page  
/cardLists &rarr; The cards page


### The boards page

![boardPage.png](PozeReadme%2FboardPage.png)


#### Board form
When pressing the "+" button the user will see a form that will have to complete:

![boardForm.png](PozeReadme%2FboardForm.png)

The form consist of:
1. The board name
2. The current board image
3. The section with images the user can choose for the board
4. The submit button


After submitting the form, the pop-up will either disappear and the new board will appear or nothing will happen, which
means that an error has occurred. An alert will appear to let user know what happened.


#### Board options
![boardOptions.png](PozeReadme%2FboardOptions.png)

By pressing one board, options for that specific board will be shown. These consist of:
- Open &rarr; Sends the user to the card page for that board
- Edit &rarr; Opens the board form. The user will modify what he wants and then will submit the form to commit the changes
- Delete &rarr; Deletes the board


### The cards page
![cardListPage.png](PozeReadme%2FcardListPage.png)

This page consists of:
- The back button - Sends the user back to the board page
- Opened board name
- Add a card list button
- The list of cards which have
  - Name
  - Options button
  - Cards
  - "Add a card" button


#### Card list form
When pressing the "+" button the user will see a form that will have to complete:

![cardListForm.png](PozeReadme%2FcardListForm.png)


#### Card list options
![cardListOptions.png](PozeReadme%2FcardListOptions.png)

It is triggered by the card list options button. There is the edit option where the user can modify the list name using
the card list form and the delete button which deletes the whole list.


#### Cards

When pressing a card, a modal will appear with its title and the entire description along with the options button
represented by the 3 vertical dots.

![card.png](PozeReadme%2Fcard.png)


##### Cards form

It is triggered when "Add a card button" from a card list is pressed.
![cardForm.png](PozeReadme%2FcardForm.png)

The form has fields for title and description and the submit button which will add a card to the corresponding list if
the process succeeds.


##### Card options

The options for the cards are the same for boards and card lists.

![cardOptions.png](PozeReadme%2FcardOptions.png)

The edit options is for modifying the card using the card form and the delete option for removing the card.


## Metrics

Google Analytics has been considered the best tool for measuring certain metrics such as:
- Users by device category
- Average interaction time for active users
- Average interaction time per session
- Number of sessions with interaction made by a user
- App stability


### Users by device category

This metric was implemented to visualize which platform is the most used by the majority of users to access the app. A
platform used by many users requires more attention than one used by a small number of users.


### Average interaction time for active users

With this metric, we not only the user time interaction, but the performance of the app itself as we can deduct the time
it takes the server to process a http request.


### Average interaction time per session

The metric extends our analysis from the second metric to the whole user base.


### Number of sessions with interaction made by a user

The higher the number of sessions means the more crucial the app is for the user's life or the popularity of the app has
increased significantly.


### App stability

Given that the app was deployed on a platform which offers for a free tier a limited amount of resources, this metric is
crucial to monitor the app's health and the impact to the user experience and take action accordingly.


## Infrastructure

The platform used for hosting the entire app stack is [Render](https://render.com/) using a free tier account. Given the
nature of the account, the ram used for one instance is 512MB which is manageable for a minimalist app.

However, given the fact that I used pictures for boards, the performance of the app was not on par with what was offered
at first, so I made as many optimizations as I possibly could and some fancy feature removals and I managed to achieve a
relatively optimal solution. In addition to the limited resources, the inactivity will shutdown the machine to conserve
resources which again is not ideal given that the app restarts really slow, so cron jobs have been created to bypass the
issue.

I tried to use [Vercel](https://vercel.com/), however I had a hard time setting the region of deployment...which led me
to search for other options such as Render.

Note: Please be gentle with the website, don't navigate too fast, or it might crash the client service on Render.


## Sources

1. Pictures for boards provided by Freepik - https://www.freepik.com/ - Latest access: 2.12.2023
2. Components for frontend app provided by Material UI - https://mui.com/material-ui/ - Latest access: 2.12.2023
3. Deployment provided by Render - https://render.com/ - Latest access - 2.12.2023