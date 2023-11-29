import boardStyles from './boards.module.css'
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import {
    Button, Card, CardActionArea, CardContent, Fade, Modal, Backdrop, Box, TextField, Container,
    ImageList, ImageListItem, Divider, CardMedia, Menu, MenuItem, ListItemIcon
} from "@mui/material";
import React, {useState} from "react";
import {Abc, InsertPhoto} from "@mui/icons-material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";
import SnackBarAlerts from "../components/SnackBarAlerts";
import {useRouter} from "next/router";
import AdderComponent from "../components/AdderComponent";
import {SERVER_URL} from "../config/utils";


async function fetchBoards() {
    let boards = []

    await axios.get(SERVER_URL + "/api/boards")
        .then(response => {boards = response.data})
        .catch(error => console.log(error))

    return boards
}

export async function getServerSideProps() {
    let boards = await fetchBoards()

    return{
        props: {
            boards: boards
        }
    }
}

export default function BoardSection({boards}) {
    // ************************ Constants ************************ //

    const defaultForm = {
        id: 0,
        boardName: '',
        image: '/Default.png',
    }

    const imageData = [
        {
            img: '/Default.png',
            title:'No background'
        },
        {
            img: '/Abstract1.jpg',
            title: 'Abstract1',
        },
        {
            img: '/Abstract2.jpg',
            title: 'Abstract2',
        },
        {
            img: '/Abstract3.jpg',
            title: 'Abstract13',
        },
        {
            img: '/Geometric1.jpg',
            title: 'Geometric1',
        },
        {
            img: '/Geometric2.jpg',
            title: 'Geometric2',
        },
        {
            img: '/Galaxy.jpg',
            title: 'Galaxy',
        },
        {
            img: '/HandDraw.jpg',
            title: 'HandDraw',
        },
        {
            img: '/Winter.jpg',
            title: 'Winter',
        },
    ]

    // ************************ Boards List ************************ //

    const [boardList, setBoardList] = useState(boards)

    const createBoard = () => {
        setFormData(defaultForm)
        switchFormView()
    }
    const deleteBoard = (formData) => {
        axios.delete(SERVER_URL + "/api/boards/" + formData.id , {
            headers: {'Content-Type': 'application/json'}
        })

        .then(() => {
            toastAlert("Board removed successfully!", "success")
            fetchBoards().then(result => setBoardList(result))
        })

        .catch(error => {
            console.log(error)
            switch (error.response.status) {
                case 404:
                    toastAlert("Board not found!", "warning")
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
            axios.post(SERVER_URL + "/api/boards", formData, {
                headers: {'Content-Type': 'application/json'}
            })

            .then(() => {
                toastAlert("Board created successfully!", "success")
                switchFormView()
                fetchBoards().then(result => setBoardList(result))
            })

            .catch(error => {
                console.log(error)
                switch (error.response.status) {
                    case 409:
                        toastAlert("The board already exists!", "warning")
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
            axios.put(SERVER_URL + '/api/boards', formData, {
                headers: {'Content-Type': 'application/json'}
            })

            .then(() => {
                toastAlert("Board modified successfully!", "success")
                switchFormView()
                fetchBoards().then(result => setBoardList(result))
            })

            .catch(error => {
                console.log(error)
                switch (error.response.status) {
                    case 409:
                        toastAlert("The board already exists!", "warning")
                        break

                    case 404:
                        toastAlert("Board not found", "error")
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
                    <Container className={boardStyles.ModalBox}>
                        <form onSubmit={sendForm}>
                            <Box className={boardStyles.formHeader}>
                                <h2> Create a new board </h2>
                                <Button type="submit" variant="contained" color="success">Submit</Button>
                            </Box>

                            <Box className={boardStyles.formContent}>
                                <Box className={boardStyles.formMainContentSection}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                                        <Abc sx={{ color: 'action.active', mr: 1 }} />
                                        <TextField
                                            required
                                            maxLength="25"
                                            id="board-name"
                                            label="Board Name"
                                            variant="standard"
                                            defaultValue={formData.boardName}
                                            onChange={(e) => {
                                                setFormData((prevState) => ({
                                                    ...prevState,
                                                    boardName: e.target.value,
                                                }))
                                            }}
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                        <InsertPhoto sx={{ color: 'action.active', mr: 1}} />

                                        <Image
                                            src={formData.image}
                                            alt="Selected picture"
                                            height={95}
                                            width={190}
                                        />
                                    </Box>
                                </Box>

                                <Divider orientation="vertical" flexItem className={boardStyles.formDivider}></Divider>

                                <ImageList className={boardStyles.formImageList} cols={3}>
                                    {imageData.map(imageItem =>
                                        <ImageListItem key={imageItem.img} sx={{ maxHeight: '100%' }}>
                                            <Image
                                                src={imageItem.img}
                                                alt={imageItem.title}
                                                width={195}
                                                height={90}
                                                loading="lazy"
                                                onClick={() => {
                                                    setFormData(prevState => ({
                                                        ...prevState,
                                                        image: imageItem.img,
                                                    }))
                                                }}
                                            />
                                        </ImageListItem>
                                    )}
                                </ImageList>
                            </Box>
                        </form>
                    </Container>
                </Fade>
            </Modal>
        )
    }

    // ************************ Menu ************************ //

    const [optionsPoint, setOptionsPoint] = useState(null)
    const optionsOpen = Boolean(optionsPoint)
    const router = useRouter()

    const clickForOptions = (e, board) => {
        setOptionsPoint(e.currentTarget)
        setFormData(board)
    }
    const closeOptions = () => setOptionsPoint(null)

    const handleOpen = (board) => {
        router.push({
            pathname: '/cardLists',
            query: {boardId: board.id}
        })
    }

    const handleEdit = () => {
        switchFormView()
        closeOptions()
    }

    const handleDelete = () => {
        deleteBoard(formData)
        closeOptions()
    }

    function menuComponent(formData, optionsPoint, optionsOpen, closeOptions, handleOpen, handleEdit, handleDelete) {
        return (
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={optionsPoint}
                open={optionsOpen}
                onClose={closeOptions}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <MenuItem onClick={() => handleOpen(formData)} sx={{color: "#1F456E"}}>
                    <ListItemIcon sx={{color: "#1F456E"}}>
                        <LaunchIcon/>
                    </ListItemIcon>

                    Open
                </MenuItem>

                <Divider/>
                <MenuItem onClick={handleEdit} sx={{color: 'black'}}>
                    <ListItemIcon sx={{color: 'black'}}>
                        <EditIcon />
                    </ListItemIcon>

                    Edit board
                </MenuItem>

                <MenuItem onClick={handleDelete} sx={{color: 'red'}}>
                    <ListItemIcon sx={{color: 'red'}}>
                        <RemoveCircleOutlineIcon/>
                    </ListItemIcon>

                    Delete board
                </MenuItem>
            </Menu>
        )
    }

    // ************************ Component ************************ //

    return(
        <div className={boardStyles.Grid}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={4}>
                {boardList.map(board =>
                    <Grid item key={board.id} xs={6} sm={4} lg={2.4}>
                        <Card className={boardStyles.BoardCard}>
                            <CardActionArea onClick={(event) => clickForOptions(event, board)} id={board.id}>
                                <CardMedia component="img" height="90" image={board.image}/>

                                <CardContent className={boardStyles.CardContent}>
                                   <b>{board.boardName}</b>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )}
            </Grid>

            <AdderComponent onClickFunction={createBoard}></AdderComponent>

            {formComponent(formData, showForm, setFormData, switchFormView, sendForm)}
            {menuComponent(formData, optionsPoint, optionsOpen, closeOptions, handleOpen, handleEdit, handleDelete)}

            <SnackBarAlerts alertInfo={alertInfo} closeAlert={closeToast}></SnackBarAlerts>
        </div>
    )
}
