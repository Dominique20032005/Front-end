import {useState} from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import "./Post.css"

const Post = () => {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <Header />
      <div className='board w-full h-screen flex items-center justify-center flex-col'>
        <button onClick={toggleModal} className="btn-modal">
          Open
        </button>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>Hello Modal</h2>
              <p>
              Hello
              </p>
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Post