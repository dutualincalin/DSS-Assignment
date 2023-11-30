import boardStyles from './boards.module.css'
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import {
    Card, CardActionArea, CardContent, Fade, Modal, Backdrop, Box, TextField, Container,
    ImageList, ImageListItem, Divider, CardMedia, Menu, MenuItem, ListItemIcon
} from "@mui/material";
import React, {useState} from "react";
import {Abc, InsertPhoto} from "@mui/icons-material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";
import {useRouter} from "next/router";
import AdderComponent from "../components/AdderComponent";
import {SERVER_URL} from "../config/utils";
import {LoadingButton} from "@mui/lab";


export async function getServerSideProps() {
    let boards = []

    await axios.get(SERVER_URL + "/api/boards")
        .then(response => {boards = response.data})
        .catch(error => console.log(error))

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
        image: '/Default.webp',
    }

    const imageData = [
        {
            img: '/Default.webp',
            title:'No background'
        },
        {
            img: '/Abstract1.webp',
            title: 'Abstract1',
        },
        {
            img: '/Abstract2.webp',
            title: 'Abstract2',
        },
        {
            img: '/Abstract3.webp',
            title: 'Abstract13',
        },
        {
            img: '/Geometric1.webp',
            title: 'Geometric1',
        },
        {
            img: '/Geometric2.webp',
            title: 'Geometric2',
        },
        {
            img: '/Galaxy.webp',
            title: 'Galaxy',
        },
        {
            img: '/HandDraw.webp',
            title: 'HandDraw',
        },
    ]

    // ************************ Boards List ************************ //
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
            router.replace(router.asPath);
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

    const toastAlert = (message, alertType) => {
        alert(alertType.toUpperCase() + ": " + message)
    }

    // ************************ Form ************************ //

    const [formBooleans, setFormBooleans] = useState({
        showForm: false,
        submitLoading: false
    })

    const switchFormView = () => setFormBooleans({
        showForm: !formBooleans.showForm,
        submitLoading: formBooleans.submitLoading
    })

    const switchSubmitLoading = () => setFormBooleans({
        showForm: formBooleans.showForm,
        submitLoading: !formBooleans.submitLoading
    })

    const [formData, setFormData] = useState(defaultForm)

    const sendForm = (event) => {
        switchSubmitLoading()
        sendFormRequest(event)
        switchSubmitLoading()
    }

    const sendFormRequest = (event) => {
        if(formData.id === 0) {
            axios.post(SERVER_URL + "/api/boards", formData, {
                headers: {'Content-Type': 'application/json'}
            })

            .then(() => {
                toastAlert("Board created successfully!", "success")
                switchFormView()
                router.replace(router.asPath);
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
        }

        else {
            axios.put(SERVER_URL + '/api/boards', formData, {
                headers: {'Content-Type': 'application/json'}
            })

            .then(() => {
                toastAlert("Board modified successfully!", "success")
                switchFormView()
                router.replace(router.asPath);
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

    function formComponent(formData, formBooleans, setFormData, switchFormView, sendForm) {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={formBooleans.showForm}
                onClose={switchFormView}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotprops={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={formBooleans.showForm}>
                    <Container className={boardStyles.ModalBox}>
                        <form onSubmit={sendForm}>
                            <Box className={boardStyles.formHeader}>
                                <h2> Create a new board </h2>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    loading={formBooleans.submitLoading}
                                >
                                    <span>
                                        Submit
                                    </span>
                                </LoadingButton>
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
                                            height={90}
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
                                                height={90}
                                                width={190}
                                                placeholder={imageItem.img}
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
                {boards.map(board =>
                    <Grid key={board.id} xs={6} sm={4} lg={2.4}>
                        <Card className={boardStyles.BoardCard}>
                            <CardActionArea onClick={(event) => clickForOptions(event, board)} id={board.id}>
                                <CardMedia
                                    component="img"
                                    height="90"
                                    image={board.image}
                                    loading="lazy"
                                />

                                <CardContent className={boardStyles.CardContent}>
                                    <b>{board.boardName}</b>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )}
            </Grid>

            <AdderComponent onClickFunction={createBoard}></AdderComponent>

            {formComponent(formData, formBooleans, setFormData, switchFormView, sendForm)}
            {menuComponent(formData, optionsPoint, optionsOpen, closeOptions, handleOpen, handleEdit, handleDelete)}
        </div>
    )
}
