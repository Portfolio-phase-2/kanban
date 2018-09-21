import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyC6azX51_Tcv09FiE6vU3N7Z5HyprkwV08',
  authDomain: 'kanban-f157d.firebaseapp.com',
  databaseURL: 'https://kanban-f157d.firebaseio.com',
  projectId: 'kanban-f157d',
  storageBucket: 'kanban-f157d.appspot.com',
  messagingSenderId: '1084929392663'
}
firebase.initializeApp(config)

const db = firebase.database()

export default db
