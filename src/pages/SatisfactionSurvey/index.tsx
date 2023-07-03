import { useRef, useEffect, useState, ChangeEvent } from "react";
import "./styles.css";
import KioskBoard from "kioskboard";
import "kioskboard/dist/kioskboard-2.3.0.min.css";
import Header from "../../components/Header";
import { motion } from 'framer-motion';
import LocalDatabase, { SatisfactionSurveyPartner, SatisfactionSurveyNoPartner } from "../../services/localDatabase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import surveyImg from "../../assets/images/survey.png";
import supabase from "../../services/externalDatabase";

function SatisfactionSurvey() {
  const localDatabase = new LocalDatabase();
  const topoRef = useRef(null);

  const [backToMenu, setBackToMenu] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [resultErrors, setResultErrors] = useState<number[]>([]);
  const [goToTop, setGoToTop] = useState<boolean>(false)

  const [errorForm, setErrorForm] = useState(false)

  const [isPartner, setIsPartner] = useState<boolean | null>(null)
  const [satisfiedWithWork, setSatisfiedWithWork] = useState<number>(0)
  const [recommendWork, setRecommendWork] = useState<boolean | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (goToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setGoToTop(false)
  }, [goToTop]);

  function IsPartnerForm() {
    const [errorInValidation, setErrorInValidation] = useState<boolean>(false)
    const howMeetPatnerKeyboardRef = useRef<HTMLInputElement>(null);

    async function handleSubmit() {
      const isValid = validateForm();
      setGoToTop(true)

      if (!isValid) {
        toast.error('Todos os campos devem ser preenchidos', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return
      }

      await saveRegister()

      setTimeout(() => {
        navigate('/menu');
      }, 2000);
    }

    async function saveRegister() {
      setIsButtonDisabled(true)

      if (!howMeetPatnerKeyboardRef.current) return

      const dataRequest: SatisfactionSurveyPartner = {
        howDidYouMeet: howMeetPatnerKeyboardRef.current.value,
        isPartner: true,
        recommendToFriend: recommendWork!,
        satisfaction: satisfiedWithWork,
        sync: false
      }

      try {
        const { data, error } = await supabase
          .from('surveyPartner')
          .insert([{ 
            isPartner: dataRequest.isPartner,
            satisfaction: dataRequest.satisfaction,
            recommendToFriend: dataRequest.recommendToFriend,
            howDidYouMeet: dataRequest.howDidYouMeet,
            sync: true,
            teste: "teste"
          }]);
  
        if (error) {
          throw new Error();
        }
  
        console.log('Dados inseridos com sucesso:', data);
        toast.success('Enviado com sucesso!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        await localDatabase.saveSurveyPartner(dataRequest)

        toast.success('Armazenado com sucesso!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error(error);
      }
    }

    function validateForm() {
      if (
        satisfiedWithWork == 0 ||
        recommendWork == null
      ){
        return false
      }

      if (howMeetPatnerKeyboardRef.current) {
        if (!howMeetPatnerKeyboardRef.current.value) {
          return false
        }
      }
      return true
    }

    useEffect(() => {
      if (howMeetPatnerKeyboardRef.current) {
        KioskBoard.run(howMeetPatnerKeyboardRef.current, {
          language: "en",
          theme: "light",
          keysArrayOfObjects: [
            {
              "0": "Q",
              "1": "W",
              "2": "E",
              "3": "R",
              "4": "T",
              "5": "Y",
              "6": "U",
              "7": "I",
              "8": "O",
              "9": "P",
            },
            {
              "0": "A",
              "1": "S",
              "2": "D",
              "3": "F",
              "4": "G",
              "5": "H",
              "6": "J",
              "7": "K",
              "8": "L"
            },
            {
              "0": "Z",
              "1": "X",
              "2": "C",
              "3": "V",
              "4": "B",
              "5": "N",
              "6": "M"
            }
          ],
        });
      }
    }, [howMeetPatnerKeyboardRef]);

    return (
      <>
        <div className='group-input'>
         <span className='inputLabel'>O QUANTO ESTÁ SATISFEITO COM O NOSSO TRABALHO?</span>
         <div className='question-1-group-buttons'>
           <button style={{
              backgroundColor: satisfiedWithWork == 1 ? '#192a56' : "#f1f2f6",
              color: satisfiedWithWork == 1 ? "#fff" : "#000"
           }}
           onClick={() => setSatisfiedWithWork(1)}>1</button>
           <button style={{
              backgroundColor: satisfiedWithWork == 2 ? '#192a56' : "#f1f2f6",
              color: satisfiedWithWork == 2 ? "#fff" : "#000"
           }} onClick={() => setSatisfiedWithWork(2)}>2</button>
           <button style={{
              backgroundColor: satisfiedWithWork == 3 ? '#192a56' : "#f1f2f6",
              color: satisfiedWithWork == 3 ? "#fff" : "#000"
           }} onClick={() => setSatisfiedWithWork(3)}>3</button>
           <button style={{
              backgroundColor: satisfiedWithWork == 4 ? '#192a56' : "#f1f2f6",
              color: satisfiedWithWork == 4 ? "#fff" : "#000"
           }} onClick={() => setSatisfiedWithWork(4)}>4</button>
           <button style={{
              backgroundColor: satisfiedWithWork == 5 ? '#192a56' : "#f1f2f6",
              color: satisfiedWithWork == 5 ? "#fff" : "#000"
           }} onClick={() => setSatisfiedWithWork(5)}>5</button>
         </div>
       </div>
       <div className='group-input'>
         <span className='inputLabel'>VOCÊ INDICARIA A TIME FORM PARA UM AMIGO?</span>
         <div className='question-1-group-buttons'>
           <button style={{ 
              backgroundColor: recommendWork ? '#192a56' : "#f1f2f6",
              color: recommendWork ? '#fff' : '#000',
              borderRadius: recommendWork ? "3px" : "0px"
           }} onClick={() => setRecommendWork(true)}>SIM</button>
           <button style={{ 
              backgroundColor: !recommendWork && recommendWork !== null ? '#192a56' : "#f1f2f6",
              color: !recommendWork && recommendWork !== null ? '#fff' : '#000',
              borderRadius: !recommendWork && isPartner !== null ? "3px" : "0px"
           }} onClick={() => setRecommendWork(false)}>NÃO</button>
         </div>
       </div>
       <div className="group-input">
         <span className="inputLabel">COMO CONHECEU A TIME FORM?</span>
         <input
           className="inputBox"
           ref={howMeetPatnerKeyboardRef}
           type="text"
           data-kioskboard-type="keyboard"
         />
       </div>
       <button onClick={() => handleSubmit()} type="submit" className="item-button-submit" disabled={isButtonDisabled}>ENVIAR</button>
        </>        
    )
  }

  function NoPartnerForm() {
    const howMeetKeyboardRef = useRef<HTMLInputElement>(null);
    const whatIsMissingKeyboardRef = useRef<HTMLInputElement>(null);

    async function handleSubmit() {      
      const isValid = validateForm();
      setGoToTop(true)

      if (!isValid) {
        toast.error('Todos os campos devem ser preenchidos', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return
      }

      await saveRegister();
      
      setTimeout(() => {
        navigate('/menu')
      }, 2000) 
    }

    async function saveRegister() {
      setIsButtonDisabled(true)

      if (!howMeetKeyboardRef.current || !whatIsMissingKeyboardRef.current) return

      const dataRequest: SatisfactionSurveyNoPartner = {
        whatIsMissing: whatIsMissingKeyboardRef.current.value,
        howDidYouMeet: howMeetKeyboardRef.current.value,
        isPartner: true,
        sync: false
      }

      try {
        const { data, error } = await supabase
          .from('surveyNoPartner')
          .insert([{ 
            isPartner: dataRequest.isPartner,
            whatIsMissing: dataRequest.whatIsMissing,
            howDidYouMeet: dataRequest.howDidYouMeet,
            sync: true
          }]);
  
        if (error) {
          console.log(error)
          throw new Error();
        }
  
        console.log('Dados inseridos com sucesso:', data);
        toast.success('Enviado com sucesso!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        await localDatabase.saveSurveyNoPartner(dataRequest)

        toast.success('Armazenado com sucesso!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error(error);
      }
    }
    
    function validateForm() {
      if (howMeetKeyboardRef.current) {
        if (!howMeetKeyboardRef.current.value) {
          return false
        }
      }

      if (whatIsMissingKeyboardRef.current) {
        if (!whatIsMissingKeyboardRef.current.value) {
          return false
        }
      }
      return true
    }

    useEffect(() => {
      if (howMeetKeyboardRef.current) {
        KioskBoard.run(howMeetKeyboardRef.current, {
          language: "en",
          theme: "light",
          keysArrayOfObjects: [
            {
              "0": "Q",
              "1": "W",
              "2": "E",
              "3": "R",
              "4": "T",
              "5": "Y",
              "6": "U",
              "7": "I",
              "8": "O",
              "9": "P",
            },
            {
              "0": "A",
              "1": "S",
              "2": "D",
              "3": "F",
              "4": "G",
              "5": "H",
              "6": "J",
              "7": "K",
              "8": "L"
            },
            {
              "0": "Z",
              "1": "X",
              "2": "C",
              "3": "V",
              "4": "B",
              "5": "N",
              "6": "M"
            }
          ],
        });
      }
    }, [howMeetKeyboardRef]);

    useEffect(() => {
      if (whatIsMissingKeyboardRef.current) {
        KioskBoard.run(whatIsMissingKeyboardRef.current, {
          language: "en",
          theme: "light",
          keysArrayOfObjects: [
            {
              "0": "Q",
              "1": "W",
              "2": "E",
              "3": "R",
              "4": "T",
              "5": "Y",
              "6": "U",
              "7": "I",
              "8": "O",
              "9": "P",
            },
            {
              "0": "A",
              "1": "S",
              "2": "D",
              "3": "F",
              "4": "G",
              "5": "H",
              "6": "J",
              "7": "K",
              "8": "L"
            },
            {
              "0": "Z",
              "1": "X",
              "2": "C",
              "3": "V",
              "4": "B",
              "5": "N",
              "6": "M"
            }
          ],
        });
      }
    }, [whatIsMissingKeyboardRef]);

    return (
      <>
        <div className="group-input">
          <span className="inputLabel">O QUE ESTÁ FALTANDO PARA INICIARMOS NOSSA PARCERIA?</span>
          <input
            className="inputBox"
            ref={whatIsMissingKeyboardRef}
            type="text"
            data-kioskboard-type="keyboard"
          />
        </div>
        <div className="group-input">
          <span className="inputLabel">COMO CONHECEU A TIME FORM?</span>
          <input
            className="inputBox"
            ref={howMeetKeyboardRef}
            type="text"
            data-kioskboard-type="keyboard"
          />
          {resultErrors.includes(0) && (
            <span className="inputLabel errorLabel">Nome inválido.</span>
          )}
        </div>
        <button onClick={() => handleSubmit()} type="submit" className="item-button-submit" disabled={isButtonDisabled}>ENVIAR</button>
      </>           
    )
  }

  return (
    <div className="container-menu-contact" ref={topoRef}>
      <div className='content-menu'>
        <Header startAnimationBack={setBackToMenu} />
        <div className='content-contact'>
          <img src={surveyImg} className='surveyImg'/>
          <form onSubmit={handleSubmit}>
            <div className='group-input'>
                <span className='inputLabel'>VOCÊ JÁ É PARCEIRO TIME FORM?</span>
                <div className='question-1-group-buttons'>
                  <button style={{ 
                    backgroundColor: isPartner ? '#192a56' : "#f1f2f6",
                    color: isPartner ? '#fff' : '#000',
                    borderRadius: isPartner ? "3px" : "0px"
                  }} onClick={() => setIsPartner(true)}>SIM</button>
                  <button style={{ 
                    backgroundColor: !isPartner && isPartner !== null ? '#192a56' : "#f1f2f6",
                    color: !isPartner && isPartner !== null ? '#fff' : '#000',
                    borderRadius: !isPartner && isPartner !== null ? "3px" : "0px"
                  }} onClick={() => setIsPartner(false)}>NÃO</button>
                </div>
            </div>
            {isPartner !== null && isPartner && (
              <IsPartnerForm />
            )}
            {isPartner !== null && !isPartner && (
              <NoPartnerForm />
            )}
          </form>
        </div>
        <div className="footerBar"/>
      </div>
      <motion.div 
        className='transition-animated'
        initial={{ right: '0%' }}
        animate={{ left: '-100%' }}
        exit={{ left: '0' }}
        transition={{ 
          duration: 0.5
        }}  
      />
      {backToMenu && (
        <motion.div 
          className='transition-animated'
          initial={{ left: '-100%' }}
          animate={{ left: '0%' }}
          exit={{ left: '0' }}
          transition={{ 
            duration: 0.5
          }}  
        />
      )}
    </div>
  );
}

export default SatisfactionSurvey;