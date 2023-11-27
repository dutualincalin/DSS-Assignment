import cardStyles from './cards.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Backdrop,
    Box,
    Button, Card, CardActionArea, CardContent, Fade, IconButton,
    ListItemIcon, Menu, MenuItem,
    Modal,
    TextField
} from "@mui/material";
import {Abc, Description, MoreVert} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SnackBarAlerts from "../../components/SnackBarAlerts";


async function fetchCards(cardListId) {
    let cards = []

    await axios.get('http://localhost:8080/api/cards/cardList/' + cardListId)
        .then(response => {cards = response.data})
        .catch(error => console.log(error))

    return cards
}

export default function CardsSection({cardListId}) {
    // ************************ Constants ************************ //

    const defaultForm = {
        id: 0,
        listId: cardListId,
        title: '',
        description: '',
    }

    // ************************ Card List ************************ //

    const [cardList, setCardList] = useState([])

    useEffect(() => {
        fetchCards(cardListId).then(result => setCardList(result))
    }, [cardListId]);

    const createCard = () => {
        setFormData(defaultForm)
        switchFormView()
    }
    const deleteCard = (formData) => {
        axios.delete("http://localhost:8080/api/cards/" + formData.id , {
            headers: {'Content-Type': 'application/json'}
        })

        .then(() => {
            switchCardView()
            toastAlert("Card removed successfully!", "success")
            fetchCards(cardListId).then(result => setCardList(result))
        })

        .catch(error => {
            console.log(error)
            switch (error.response.status) {
                case 404:
                    toastAlert("Card not found!", "warning")
                    break

                case 400:
                    toastAlert("Your request has issues with its content.", "error")
                    break

                default:
                    toastAlert("The server is down or has an error.", "error")
            }
        })
    }

    // ************************ Alerts ************************ //

    const [alertInfo, setAlertState] = useState({state: false, message: "", alertType: "success"})

    const toastAlert = (message, alertType) => {
        setAlertState({state: true, message: message, alertType: alertType})
    }
    const closeToast = () => {setAlertState({...alertInfo, state: false})}

    // ************************ Form ************************ //

    const [showForm, setFormView] = useState(false)
    const switchFormView = () => setFormView(!showForm)

    const [formData, setFormData] = useState(defaultForm)
    const sendForm = (event) => {
        if(formData.id === 0) {
            axios.post("http://localhost:8080/api/cards", formData, {
                headers: {'Content-Type': 'application/json'}
            })

                .then(() => {
                    toastAlert("Card created successfully!", "success")
                    switchFormView()
                    fetchCards(cardListId).then(result => setCardList(result))
                })

                .catch(error => {
                    console.log(error)
                    switch (error.response.status) {
                        case 409:
                            toastAlert("The card already exists!", "warning")
                            break

                        case 400:
                            toastAlert("Your request has issues with its content.", "error")
                            break

                        default:
                            toastAlert("The server is down or has an error.", "error")
                    }
                })

            event.preventDefault()
        }

        else {
            axios.put("http://localhost:8080/api/cards", formData, {
                headers: {'Content-Type': 'application/json'}
            })

            .then(() => {
                toastAlert("Card modified successfully!", "success")
                switchFormView()
                fetchCards(cardListId).then(result => setCardList(result))
            })

            .catch(error => {
                console.log(error)
                switch (error.response.status) {
                    case 409:
                        toastAlert("The card already exists!", "warning")
                        break

                    case 404:
                        toastAlert("Card not found", "error")
                        break

                    case 400:
                        toastAlert("Your request has issues with its content.", "error")
                        break

                    default:
                        toastAlert("The server is down or has an error.", "error")
                }
            })
        }

        event.preventDefault()
    }

    function formComponent(formData, showForm, setFormData, switchFormView, sendForm) {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={showForm}
                onClose={switchFormView}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotprops={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={showForm}>
                    <Box className={cardStyles.generalModalBox}>
                        <form onSubmit={sendForm}>
                            <Box className={cardStyles.generalHeaderBox}>
                                <h2> Create a new card </h2>
                                <Button type="submit" variant="contained" color="success">Submit</Button>
                            </Box>

                            <Box className={cardStyles.formContentBox}>
                                <Abc sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                                <TextField
                                    required
                                    maxLength="25"
                                    id="card-title"
                                    label="Title"
                                    variant="standard"
                                    defaultValue={formData.title}
                                    onChange={(e) => {
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            title: e.target.value,
                                        }))
                                    }}
                                />
                            </Box>

                            <Box className={cardStyles.formContentBox}>
                                <Description sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                                <TextField
                                    required
                                    maxLength="25"
                                    id="card-description"
                                    label="Description"
                                    variant="standard"
                                    fullWidth
                                    defaultValue={formData.description}
                                    onChange={(e) => {
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            description: e.target.value,
                                        }))
                                    }}
                                />
                            </Box>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        )
    }

    // ************************ Modal View  ************************ //
    const[cardViewState, setCardView] = useState(false)
    const switchCardView = () => setCardView(!cardViewState)

    const openViewState = (card) => {
        setFormData(card)
        switchCardView()
    }

    function cardView(formData, cardViewState, closeCardView, openMenu) {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={cardViewState}
                onClose={closeCardView}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotprops={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={cardViewState}>
                    <Box className={cardStyles.generalModalBox} sx={{paddingLeft: '1%'}}>
                        <Box className={cardStyles.generalHeaderBox}>
                            <h2> {formData.title} </h2>

                            <IconButton sx={{color: 'black'}} onClick={(event) => {openMenu(event)}}>
                                <MoreVert />
                            </IconButton>
                        </Box>

                        <p>{formData.description}</p>
                    </Box>
                </Fade>
            </Modal>
        )
    }

    // ************************ Menu  ************************ //

    const [optionsPoint, setOptionsPoint] = useState(null)
    const optionsOpen = Boolean(optionsPoint)

    const clickForOptions = (e) => {
        setOptionsPoint(e.currentTarget)
    }
    const closeOptions = () => setOptionsPoint(null)

    const handleEdit = () => {
        switchFormView()
        closeOptions()
    }

    const handleDelete = () => {
        deleteCard(formData)
        closeOptions()
    }

    function menuComponent(formData, optionsPoint, optionsOpen, closeOptions, handleEdit, handleDelete) {
        return (
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={optionsPoint}
                open={optionsOpen}
                onClose={closeOptions}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <MenuItem onClick={handleEdit} sx={{color: 'black'}}>
                    <ListItemIcon sx={{color: 'black'}}>
                        <EditIcon />
                    </ListItemIcon>

                    Edit card
                </MenuItem>

                <MenuItem onClick={handleDelete} sx={{color: 'red'}}>
                    <ListItemIcon sx={{color: 'red'}}>
                        <RemoveCircleOutlineIcon/>
                    </ListItemIcon>

                    Delete card
                </MenuItem>
            </Menu>
        )
    }

    // ************************ Main Component ************************ //

    return(
        <div>
            <Box className={cardStyles.listCardBox} display="flex" height="max-content" overflow="auto">
                {cardList.map(card =>
                    <Card key={card.id} className={cardStyles.listCard}>
                        <CardActionArea onClick={() => openViewState(card)}>
                            <CardContent>
                                <h3>{card.title}</h3>

                                <p>{card.description.length > 83 ?
                                    card.description.slice(0, 82) + '...'
                                    : card.description}
                                </p>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )}
            </Box>
            <Button label="Add a card" variant="text" onClick={createCard}>Add a card</Button>

            {formComponent(formData, showForm, setFormData, switchFormView, sendForm)}
            {cardView(formData, cardViewState, switchCardView, clickForOptions)}
            {menuComponent(formData, optionsPoint, optionsOpen, closeOptions, handleEdit, handleDelete)}

            <SnackBarAlerts alertInfo={alertInfo} closeAlert={closeToast}></SnackBarAlerts>
        </div>
    )
}