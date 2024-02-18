import React, {useState, useEffect} from "react";
import './App.scss';
import Header from './components/header';
import Tabs from './components/tabs';
import RecipeList from './components/recipe_list';
import MidBarModals from "./components/MidBarModals";

function App() {

  const [loader, setLoader]= useState(false);
  const [activeNavbarModal, setActiveNavbarModal] = useState(null);

  const requestOpenModal = (obj) => {
    setActiveNavbarModal(obj);
  };


  const requestCloseModal = () => {
    setActiveNavbarModal(null);
  };



  return (
    <div className="main">
        <Header/>
        <Tabs 
        loader={loader}
         setLoader={setLoader}
        requestOpenModal={requestOpenModal}
        requestCloseModal={requestCloseModal}
         />
        <RecipeList 
        loader={loader}
         setLoader={setLoader}
          requestOpenModal={requestOpenModal}
          requestCloseModal={requestCloseModal}
         />
        {loader &&
        <div className="loader">
          <div className="spinner">

          </div>
        </div>
        }

        {activeNavbarModal?.component ? (
            <MidBarModals {...activeNavbarModal} close={requestCloseModal}>
              {activeNavbarModal.component}
            </MidBarModals>
          ) : null}
    </div>
  );
}

export default App;
