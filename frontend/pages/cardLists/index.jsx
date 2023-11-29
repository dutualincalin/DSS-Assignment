import cardListStyles from './cardList.module.css'
import axios from "axios";
import AdderComponent from "../../components/AdderComponent";
import React, {useState} from "react";
import SnackBarAlerts from "../../components/SnackBarAlerts";
import {Backdrop, Box, Button, Card, CardContent, Container, Fade, IconButton, ListItemIcon, Menu, MenuItem, Modal,
    TextField
} from "@mui/material";
import {Abc, ArrowCircleLeft, MenuOpen} from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {useRouter} from "next/router";
import {SERVER_URL} from "../../config/utils";
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import('../cards/index'), {
    ssr: false,
});

export async function getServerSideProps(context) {
    const {query} = context;
    let boardId = parseInt(query.boardId)
    let cardListCollection = []

    await axios.get(SERVER_URL + '/api/cardLists/board/' + boardId)
        .then(response => {cardListCollection = response.data})
        .catch(error => console.log(error))

    let board = null
    await axios.get(SERVER_URL + '/api/boards')
        .then(response => board = response.data.filter(boardItem => boardItem.id === boardId)[0])
        .catch(error => console.log(error))

    return {
        props: {
            board: board,
            cardListCollection: cardListCollection
        }
    }
}

export default function CardListsSection({board, cardListCollection}) {
    // ************************ Constants ************************ //

    const router = useRouter()
    const defaultForm = {
        id: 0,
        boardId: board.id,
        name: ""
    }

    // ************************ CardList Collection ************************ //

    const createList = () => {
        setFormData(defaultForm)
        switchFormView()
    }
    const deleteList = (formData) => {
        axios.delete(SERVER_URL + '/api/cardLists/' + formData.id , {
            headers: {'Content-Type': 'application/json'}
        })

        .then(() => {
            toastAlert("List removed successfully!", "success")
            router.replace(router.asPath);
        })

        .catch(error => {
            console.log(error)
            switch (error.response.status) {
                case 404:
                    toastAlert("The list doesn't exists!", "warning")
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
            axios.post(SERVER_URL + '/api/cardLists', formData, {
                headers: {'Content-Type': 'application/json'}
            })

            .then(() => {
                toastAlert("List created successfully!", "success")
                switchFormView()
                router.replace(router.asPath);
            })

            .catch(error => {
                console.log(error)
                switch (error.response.status) {
                    case 409:
                        toastAlert("The list already exists!", "warning")
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
            axios.put(SERVER_URL + '/api/cardLists', formData, {
                headers: {'Content-Type': 'application/json'}
            })

                .then(() => {
                    toastAlert("List modified successfully!", "success")
                    switchFormView()
                    router.replace(router.asPath);
                })

                .catch(error => {
                    console.log(error)
                    switch (error.response.status) {
                        case 409:
                            toastAlert("The list already exists!", "warning")
                            break

                        case 404:
                            toastAlert("List not found", "error")
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
                    <Box className={cardListStyles.ModalBox}>
                        <form onSubmit={sendForm}>
                            <Box className={cardListStyles.formHeader}>
                                <h2> Create a new card list </h2>
                                <Button type="submit" variant="contained" color="success">Submit</Button>
                            </Box>

                            <Box className={cardListStyles.formContent}>
                                <Abc sx={{ color: 'action.active', mr: 1, mt: 1 }} />
                                <TextField
                                    required
                                    maxLength="25"
                                    id="list-name"
                                    label="List Name"
                                    variant="standard"
                                    defaultValue={formData.name}
                                    onChange={(e) => {
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
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

    // ************************ Menu ************************ //

    const [optionsPoint, setOptionsPoint] = useState(null)
    const optionsOpen = Boolean(optionsPoint)

    const clickForOptions = (e, cardList) => {
        setOptionsPoint(e.currentTarget)
        setFormData(cardList)
    }
    const closeOptions = () => setOptionsPoint(null)

    const handleEdit = () => {
        switchFormView()
        closeOptions()
    }

    const handleDelete = () => {
        deleteList(formData)
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

                    Edit list
                </MenuItem>

                <MenuItem onClick={handleDelete} sx={{color: 'red'}}>
                    <ListItemIcon sx={{color: 'red'}}>
                        <RemoveCircleOutlineIcon/>
                    </ListItemIcon>

                    Delete list
                </MenuItem>
            </Menu>
        )
    }

    // ************************ Component ************************ //

    return (
        <div className={cardListStyles.Grid}>
            <Image
                src={board.image}
                layout={'fill'}
                loading="lazy"
                className={cardListStyles.backgroundImage}
                alt="background image"
            />

            <Box className={cardListStyles.componentHeader}>
                <IconButton className={cardListStyles.componentHeaderIcon} onClick={() => router.back()}>
                    <ArrowCircleLeft fontSize="large"/>
                </IconButton>
                <h1>{board.boardName}</h1>
            </Box>

            <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={4}>
                {cardListCollection.map(cardList =>
                    <Grid item key={cardList.id} xs={6} sm={4} lg={2.4}>
                        <Card className={cardListStyles.cardListBox}>
                            <Container className={cardListStyles.cardListHeaderContainer}>
                                <h2>{cardList.name}</h2>

                                <IconButton
                                    style={{height:"100%"}}
                                    size={"small"}
                                    onClick={(event) => clickForOptions(event, cardList)}
                                >
                                    <MenuOpen/>
                                </IconButton>
                            </Container>

                            <CardContent sx={{width: '100%'}}>
                                <DynamicHeader cardListId={cardList.id}></DynamicHeader>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>

            {formComponent(formData, showForm, setFormData, switchFormView, sendForm)}
            {menuComponent(formData, optionsPoint, optionsOpen, closeOptions, handleEdit, handleDelete)}

            <AdderComponent onClickFunction={createList}></AdderComponent>
            <SnackBarAlerts alertInfo={alertInfo} closeAlert={closeToast}></SnackBarAlerts>

        </div>
    )
}