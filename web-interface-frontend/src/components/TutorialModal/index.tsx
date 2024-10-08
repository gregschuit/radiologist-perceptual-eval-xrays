import * as React from 'react';
import clsx from 'clsx';
import { styled, Box, Theme } from '@mui/system';
import { Modal } from '@mui/base/Modal';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import LINKS from 'src/links';

import './style.css';

interface Props {
  openModal: boolean,
  handleClose: () => void,
};

const TutorialModal: React.FC<Props> = ({ openModal, handleClose }) => {
  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={openModal}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">Instrucciones</h2>
          Hola, a continuación se exponen algunas cosas que deberás saber antes de
          navegar nuestra interfaz.
          <h3>Acerca de las tareas a realizar</h3>
          <p id="unstyled-modal-description">
            Este sistema tiene por objetivo realizar anotaciones en imágenes de rayos X
            tanto de pacientes reales como imágenes sintéticas generadas por IA.
            Estas imágenes sintéticas no provienen de pacientes reales, pero son
            generadas por una IA entrenada con imágenes de rayos X de pacientes reales.
            Las imágenes utilizadas en este sistema provienen de un dataset público,
            MIMIC-CXR, y las imágenes sintéticas son generadas por un modelo de IA
            entrenado con imágenes del mismo dataset público.
          </p>
          <p>
            En adición a lo anterior, en la "Tarea 3", se desea explorar la utilidad de las imágenes
            sintéticas de rayos X a la hora de evaluar modelos de IA que detectan de manera
            automática ciertos hallazgos en las imágenes.
          </p>
          <Accordion defaultExpanded >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <h3>
                  Tarea 3
                </h3>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="modal-two-cols-layout">
                <div className="modal-right-col">
                  <p>
                    En esta tarea se te pedirá evaluar el rendimiento de un modelo de IA
                    para la detección de cuatro anomalías frecuentes ("Enlarged 
                    Cardiac Silhouette", "Lung Opacity", "Pleural Effusion" y "Atelectasis").
                  </p>
                  <p>
                    Por ejemplo, en la siguiente foto, se muestra que el modelo de IA ha
                    indicado que la etiqueta
                    "Enlarged Cardiac Silhouette" está presente en la imagen. Esto
                    significa que, independientemente de otros posibles hallazgos,
                    el modelo afirma que la anomalía está presente.
                  </p>
                </div>
                <div className="modal-left-col">
                  <div className='modal-centered-content'>
                    <img
                      src={LINKS.IMG_TASK3_TUTORIAL_1}
                      width="90%"
                      alt="t1"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-two-cols-layout">
                <div className="modal-right-col">
                  <p>
                    Tu tarea será juzgar si lo que asevera el modelo es correcto o no, 
                    he indicar la razón que te ha hecho llegar a tal conclusión, tal
                    y como se muestra en la foto.
                  </p>
                  <p>
                    Para poder inspeccionar la radiografía de mejor manera, podrás
                    usar el <i>slider</i> bajo las imágenes para regular su contraste.
                  </p>
                </div>
                <div className="modal-left-col">
                  <div className='modal-centered-content'>
                    <img
                      src={LINKS.IMG_TASK3_TUTORIAL_2}
                      width="80%"
                      alt="t1"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-two-cols-layout">
                <div className="modal-right-col">
                  <p>
                    Cada cierta cantidad de casos evaluados, se te hará un
                    cuestionarios de seguimiento con preguntas que deberás responder
                    considerando tu impresión del modelo hasta ese momento.
                  </p>
                </div>
                <div className="modal-left-col">
                  <div className='modal-centered-content'>
                    <img
                      src={LINKS.IMG_TASK3_TUTORIAL_3}
                      width="80%"
                      alt="t1"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-two-cols-layout">
                <div className="modal-right-col">
                  <p>
                    A medida de que vayas avanzando en los cuestionarios,
                    se te entregará información extra sobre el modelo de IA
                    con la intención de ayudarte a discernir sobre su correctitud.
                    Esta información adicional es denominada "explicación".
                  </p>
                  <p>
                    Estas explicaciones serán de dos tipos:
                  </p>
                  <ul>
                    <li>
                      <strong>Factual:</strong> donde se muestra otra radiografía que el modelo tambien
                      califica con la misma etiqueta que la imagen principal.
                    </li>
                    <li>
                      <strong>Contrafactual:</strong> donde se muestra un caso de cómo se vería una
                      radiografía donde el modelo no encuentra tal hallazgo.
                    </li>
                  </ul>
                  <p>
                    En un inicio, no se te mostrarán explicaciones. Luego, se te 
                    mostrarán solo explicaciones factuales. Posteriormente, solo
                    contrafactuales y, finalmente, ambas explicaciones en conjunto.
                  </p>
                </div>
                <div className="modal-left-col">
                  <div className='modal-centered-content'>
                    <img
                      src={LINKS.IMG_TASK3_TUTORIAL_4}
                      width="90%"
                      alt="t1"
                    />
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <h3>
                  Tarea 2
                </h3>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="modal-two-cols-layout">
                <div className="modal-right-col">
                  <p>
                    En esta tarea se te pedirá determinar si es que una anomalía
                    específica está presente en la imagen.
                  </p>
                  <p>
                    Por ejemplo, en la siguiente foto, se pregunta si el hallazgo
                    "Enlarged Cardiac Silhouette" está presente o no en la imagen.
                    Deberás contestar usando la escala desplegada, es decir, desde
                    un "Definitivamente no se observa la característica" a un
                    "Definitivamente sí se observa".
                  </p>
                </div>
                <div className="modal-left-col">
                  <div className='modal-centered-content'>
                    <img
                      src={LINKS.IMG_TASK2_DEMO}
                      width="90%"
                      alt="t1"
                    />
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <h3>
                  Tarea 1
                </h3>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="modal-two-cols-layout">
                <div className="modal-right-col">
                  <p>
                    En esta tarea se te presentarán varios pares de imágenes.
                    Cada par estará conformado por
                    una imagen real y una generada por el modelo de IA. Tu tarea consiste
                    en identificar cuál de ellas es la generada.
                  </p>
                  <p>
                    Para esto, deberás fijarte si
                    existen aspectos poco realistas que delaten a la imagen generada.
                    En caso de no poner determinarlo, deberás contestar con la opción
                    "No lo puedo determinar".
                  </p>
                  <p>
                    Si tu respuesta es diferente a "No lo puedo determinar", se te
                    pedirá que indiques cuál fue el principal aspecto que te permitió
                    decidir. Para más detalle, a continuación puedes desplegar
                    las definiciones de cada opción.
                  </p>
                </div>
                <div className="modal-left-col">
                  <div className='modal-centered-content'>
                    <img
                      src={LINKS.IMG_TASK1_DEMO}
                      width="90%"
                      alt="t1"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-accordion-container" >
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Posibles aspectos a notar en las imágenes sintéticas:</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <ul>
                        <li>
                          <b>Partes blandas</b>: que incluyen alteraciones en el contorno y/o densidad (áreas radiolúcidas/radiodensas) de tejidos blandos de la pared torácica, regiones cervicales bajas y/o región dorsolumbar.
                        </li>
                        <li>
                          <b>Estructura ósea</b>: que incluyen alteraciones en el contorno (ej: ondulación costillas) y/o densidad del hueso.
                        </li>
                        <li>
                          <b>Dispositivos externos</b>: alteraciones que incluyen anomalía en la ubicación y morfología de dispositivos externos (ej: caja de marcapasos, reservorio de quimioterapia); discontinuidad de tubos o líneas.
                        </li>
                        <li>
                          <b>Artefactos de la imagen</b>: bordes blancos, rotación, mala exposición, o cropping de la imagen.
                        </li>
                        <li>
                          <b>Otros</b>: texto libre. Se te pedirá escribir otro tipo de aspecto que no haya sido listado anteriormente.
                        </li>
                      </ul>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </AccordionDetails>
          </Accordion>
          <h3>Herramientas de la interfaz</h3>
          <p>
            En el costado superior derecho de esta interfaz, puedes encontrar
            varias herramientas que te podrían ser de utilidad.
          </p>
          <div className='modal-centered-content'>
            <img src={LINKS.IMG_NAVBAR_DEMO} width="40%" alt="t1" />
          </div>
          <p>
            La primera, sirve para volver ver este instructivo. Haz clic fuera de la ventana
            emergente o bien presiona la tecla "Esc" para cerrarlo. En segundo
            lugar, la herramienta de lupa te permitirá visualizar las imágenes
            con un mayor tamaño. Sin embargo, es importante notar que la resolución
            no estará aumentando, sino que solamente se ampliará la misma imagen.
            Finalmente, está el cambio de tema para poder
            navegar la aplicación en modo claro u oscuro. Se recomienda usar
            el modo oscuro para no cansar de más la vista debido al brillo excesivo.
          </p>
          <br></br>
          <div className='modal-centered-content'>
            <Button variant="contained" onClick={handleClose}>Aceptar</Button>
          </div>
        </Box>
      </StyledModal>
    </div>
  );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme: Theme) => ({
  width: '80%',
  maxHeight: '90%',
  overflow: 'auto',
  borderRadius: '12px',
  padding: '16px 32px 24px 32px',
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
});

export default TutorialModal;
