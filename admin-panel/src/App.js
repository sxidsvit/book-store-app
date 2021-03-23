/* eslint-disable default-case */
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { storage, database } from './firebase/config'

function App() {

  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    let file = e.target[0].files[0]
    const imageRef = storage.ref().child(`bookstore/${file.name}`)
    const uploadTask = imageRef.put(file)

    uploadTask.on('state_changed',
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log('Firebase storage error: ', error)
        // Handle unsuccessful uploads
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL()
          .then(downloadURL => setUrl(downloadURL))
          .then(console.log('url: ', url))
          .then(async () => {
            const databaseRef = database.ref(`bookstore/${Date.now()}`)
            await databaseRef.set({
              bookName: "Serrgey Antonyuk",
              bookCover: `${url}`,
              rating: 4.5,
              language: "Eng",
              pageNo: 341,
              author: "Jasmine Warga",
              genre: [
                "Romance", "Adventure", "Drama"
              ],
              readed: "12k",
              description: "Jude never thought she’d be leaving her beloved older brother and father behind, all the way across the ocean in Syria. But when things in her hometown start becoming volatile, Jude and her mother are sent to live in Cincinnati with relatives. At first, everything in America seems too fast and too loud. The American movies that Jude has always loved haven’t quite prepared her for starting school in the US—and her new label of 'Middle Eastern,' an identity she’s never known before. But this life also brings unexpected surprises—there are new friends, a whole new family, and a school musical that Jude might just try out for. Maybe America, too, is a place where Jude can be seen as she really is.",
              backgroundColor: "rgba(240,240,232,0.9)",
              categoryName: "Best Seller",
              navTintColor: "#000",
              completion: "75%",
              lastRead: "3d 5h",
            })
              .then(console.log('Data saved to database successfully'))
          })
      }
    )
  }

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.File id="FormControlFile1" label="File input" />
        </Form.Group>
        <Button variant="primary" type="submit" >Submit</Button>
      </Form>
    </Container>
  );
}

export default App;
