import { useRef, useEffect, useState, ChangeEvent } from "react";
import "./styles.css";
import KioskBoard from "kioskboard";
import "kioskboard/dist/kioskboard-2.3.0.min.css";
import Header from "../../components/Header";
import { motion } from 'framer-motion';
import contactImg from "../../assets/images/contact-page.png";

function ContactForm() {
  const nameKeyboardRef = useRef<HTMLInputElement>(null);
  const cnpjKeyboardRef = useRef<HTMLInputElement>(null);
  const corporateNameKeyboardRef = useRef<HTMLInputElement>(null);
  const emailKeyboardRef = useRef<HTMLInputElement>(null);
  const commentsKeyboardRef = useRef<HTMLTextAreaElement>(null);

  const [ backToMenu, setBackToMenu ] = useState<boolean>(false)
  const [resultErrors, setResultErrors] = useState<number[]>([]);
  const [productSelect, setProductSelect] = useState("TODOS")

  useEffect(() => {
    if (nameKeyboardRef.current) {
      KioskBoard.run(nameKeyboardRef.current, {
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
  }, [nameKeyboardRef]);

  useEffect(() => {
    if (cnpjKeyboardRef.current) {
      KioskBoard.run(cnpjKeyboardRef.current, {
        theme: "light",
        keysArrayOfObjects: [
          {
            "0": "7",
            "1": "8",
            "2": "9"
          },
          {
            "0": "4",
            "1": "5",
            "2": "6"
          },
          {
            "0": "1",
            "1": "2",
            "2": "3"
          },
          {
            "0": "0",
            "1": "."
          }
        ],
      });
    }
  }, [cnpjKeyboardRef]);

  useEffect(() => {
    if (corporateNameKeyboardRef.current) {
      KioskBoard.run(corporateNameKeyboardRef.current, {
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
  }, [corporateNameKeyboardRef]);

  useEffect(() => {
    if (emailKeyboardRef.current) {
      KioskBoard.run(emailKeyboardRef.current, {
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
  }, [emailKeyboardRef]);

  useEffect(() => {

    if (commentsKeyboardRef.current) {
      KioskBoard.run(commentsKeyboardRef.current, {
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
  }, [commentsKeyboardRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      nameKeyboardRef.current &&
      cnpjKeyboardRef.current &&
      corporateNameKeyboardRef.current &&
      emailKeyboardRef.current &&
      commentsKeyboardRef.current
    ){
      const name = nameKeyboardRef.current.value;
      const cnpj = cnpjKeyboardRef.current.value;
      const corporateName = corporateNameKeyboardRef.current.value;
      const email = emailKeyboardRef.current.value;

      const fields = [name, cnpj, corporateName, email]
      let resultErrorsData = []

      for (let i = 0; i < fields.length; i++) {
        if (!fields[i]) {
          resultErrorsData.push(i)
        }
      }

      if(resultErrorsData.length > 0) {
        setResultErrors(resultErrorsData);
        return 
      }

      const formIsValid = validateForm(cnpj, email);
      if (!formIsValid) return

      const comments = commentsKeyboardRef.current.value;
    }
  }

  const validateForm = (cnpj: string, email: string) => {
    let resultErrorsData = [];
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("chegou aqui!")

    if (cnpj.length !== 14) {
      resultErrorsData.push(1);
      setResultErrors(resultErrorsData)
      return false
    }

    if (!regexEmail.test(email)) {
      resultErrorsData.push(3)
      setResultErrors(resultErrorsData)
      return false
    }

    return true;
  }

  const saveInLocalDB = (
    name: string, 
    cnpj: string, 
    email: string, 
    corporateName: string, 
    comments: string) => {

  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProductSelect(event.target.value);
    console.log(event.target.value)
  };

  return (
    <div className="container-menu-contact">
      <div className='content-menu'>
        <Header startAnimationBack={setBackToMenu} />
        <div className='content-contact'>
          <img src={contactImg} className='contactImg'/>
          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <span className="inputLabel">NOME:</span>
              <input
                className="inputBox"
                ref={nameKeyboardRef}
                type="text"
                data-kioskboard-type="keyboard"
              />
              {resultErrors.includes(0) && (
                <span className="inputLabel errorLabel">Nome inválido.</span>
              )}
            </div>
            <div className="inputGroup">
              <span className="inputLabel">CNPJ:</span>
              <input
                className="inputBox"
                ref={cnpjKeyboardRef}
                type="text"
                data-kioskboard-type="keyboard"
              />
              {resultErrors.includes(1) && (
                <span className="inputLabel errorLabel">CNPJ inválido.</span>
              )}
            </div>
            <div className="inputGroup">
              <span className="inputLabel">RAZÃO SOCIAL:</span>
              <input
                className="inputBox"
                ref={corporateNameKeyboardRef}
                type="text"
                data-kioskboard-type="keyboard"
              />
              {resultErrors.includes(2) && (
                <span className="inputLabel errorLabel">Razão Social inválida.</span>
              )}
            </div>
            <div className="inputGroup">
              <span className="inputLabel">EMAIL:</span>
              <input
                className="inputBox"
                ref={emailKeyboardRef}
                type="text"
                data-kioskboard-type="keyboard"
              />
              {resultErrors.includes(3) && (
                <span className="inputLabel errorLabel">Email inválido.</span>
              )}
            </div>
            <div className="inputGroup">
              <span className="inputLabel">PRODUTOS:</span>
              <select className="inputDropdown" value={productSelect} onChange={handleSelectChange}>
                <option value="TODOS">TODOS</option>
                <option value="SACHÊS">SACHÊS</option>
                <option value="RÓTULOS">RÓTULOS</option>
                <option value="CAIXAS">CAIXAS</option>
                <option value="LINHA DIGITAL">LINHA DIGITAL</option>
              </select>
            </div>
            <div className="inputGroup">
              <span className="inputLabel">OBSERVAÇÕES:</span>
              <textarea
                className="inputBox observationInput"
                ref={commentsKeyboardRef}
                data-kioskboard-type="keyboard"
              />
            </div>
            <button type="submit" className="item-button-submit">ENVIAR</button>
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

export default ContactForm;