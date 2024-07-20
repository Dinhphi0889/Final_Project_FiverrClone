
// import antd
import { Avatar, Button, Card, GetProp, Modal, UploadProps, message } from 'antd'

// import hooks
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { useEffect, useState } from 'react'

// import css
import './cssProfile.css'

// import componenst FormEdit
import FormEdit from './FormEdit'

// import api
import { apiEditUser } from '../../../apis/apiEditUser'

// import action
import { currentUserAction } from '../../../redux/slices/user.slice'

// import TypeUser
import { TypeUser } from '../../../types/typeUser'
import { apiGetJobHired } from '../../../apis/apiGetJobHired'
import Meta from 'antd/es/card/Meta'

export default function ProfilePage() {

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    // create + use hooks
    const dispatch = useAppDispatch()
    const { currentUser } = useAppSelector((state) => state.user)
    const [getNameAvatar, setGetNameAvatar] = useState('')
    const [hiddenPhone, setHiddenPhone] = useState<any>()
    const [hiddenEmail, setHiddenEmail] = useState<any>()
    const [messageApi, contextHolder] = message.useMessage();

    const [formData, setFormData] = useState<TypeUser>();
    const [loading, setLoading] = useState(false);
    const [isJobHired, setIsJobHired] = useState()

    // notify register
    const registerSuccess = () => {
        messageApi.open({
            type: 'success',
            content: 'Update Success',
        });
    };

    // hooks open modal
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            registerSuccess()
        }, 500);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    // hooks hidden phone & email
    useEffect(() => {
        handlerHiddenPhone()
        handlerHiddenEmail()
    }, [])

    // handler hidden phone
    const handlerHiddenPhone = () => {
        const phone = currentUser.user.phone
        if (phone.length == 10) {
            let getNumberFront = phone.slice(0, 3)
            let getNumberBack = phone.slice(-2)
            let changeNumberMiddle = '*'.repeat(phone.length - 5)
            let mergePhone = getNumberFront + changeNumberMiddle + getNumberBack
            setHiddenPhone(mergePhone)
        }
    }

    // handler hidden email
    const handlerHiddenEmail = () => {
        const email = currentUser.user.email
        if (email) {
            let getEmailFront = email.slice(0, 3)
            let getEmailBack = email.slice(-2)
            let changeEmailMiddle = '*'.repeat(email.length - 5)
            let mergeEmail = getEmailFront + changeEmailMiddle + getEmailBack
            setHiddenEmail(mergeEmail)
        }
    }

    // Submit editUser
    const handeFormSubmit = async () => {
        if (formData) {
            const result = await apiEditUser(currentUser?.user.id, formData)
            const local = {
                token: currentUser.token,
                user: result,
            }
            localStorage.setItem('user', JSON.stringify(local))
            dispatch(currentUserAction.setCurrentUser(local))
            handleOk()

        } else {
            handleCancel()
        }
    }

    //FormEdit User
    const handleFormEdit = (data: any) => {
        const newArrSkill = data.skill.split(',')
        const newArrCer = data.certification.split(',')
        const value = {
            ...data,
            birthday: data['birthday'].format('DD-MM-YYYY'),
            skill: newArrSkill,
            certification: newArrCer,
            role: currentUser.user.role
        }
        setFormData(value);
    };

    const handlerModal = () => {
        return <>
            <Modal
                className='modal-edit text-center'
                open={open}
                title="Edit Profile"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handeFormSubmit}>
                        Update
                    </Button>,

                ]}
            >
                <FormEdit dataProps={currentUser.user} onFormEdit={handleFormEdit} />
            </Modal>
        </>
    }

    useEffect(() => {
        if (currentUser) {
            let getNameUser = currentUser?.user.name
            let getNameUserSplit = getNameUser.charAt(0)
            setGetNameAvatar(getNameUserSplit.toUpperCase())
        }
    }, [currentUser])

    const callApiHiredJob = async () => {
        const result = await apiGetJobHired()
        setIsJobHired(result)
    }

    useEffect(() => {
        callApiHiredJob()
    }, [])

    return (
        <>
            {contextHolder}
            <div className="profile">
                <div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    <div className="profile-left my-10 lg:mr-5 col-span-1">
                        <div className="profile-left-card">
                            <Card
                                className='card-avatar sm:w-full lg:w-96'

                                actions={[
                                    <>
                                        <div className='card-bottom'>
                                            <div className='text-base'>
                                                <i className="fa-solid fa-location-dot mr-3 mb-2"></i>
                                                <span>From</span>
                                            </div>
                                            <span>VietNam</span>
                                        </div>
                                        <div className='card-bottom'>
                                            <div>
                                                <i className="fa-solid fa-user mr-3"></i>
                                                <span>Member Since</span>
                                            </div>
                                            <span>July 2024</span>
                                        </div>
                                    </>
                                ]}>

                                <Avatar
                                    style={{
                                        verticalAlign: 'middle',
                                        fontSize: '2rem',
                                        background: 'orange'
                                    }}
                                    size={100}>

                                    {currentUser.user.avatar ? <img src={currentUser.user.avatar}></img> : getNameAvatar}
                                </Avatar>

                                <p className='card-name lg:my-3'>{currentUser?.user.name}
                                </p>
                                <Button
                                    className='button-edit'
                                    onClick={showModal}
                                >
                                    <i className="fa-solid fa-pencil"></i>
                                </Button>
                            </Card>

                            <Card
                                className='card-information mt-8'

                            >
                                <div className='information'>

                                    {/* Description */}
                                    <div className='description card-information-tittle items-center'>
                                        <em>Description</em>
                                        <Button
                                            className='button-edit'
                                            onClick={showModal}>
                                            <i className="fa-solid fa-pencil"></i>
                                        </Button>
                                    </div>
                                    <div className='description card-information-detail'>
                                        <span>Email:</span>
                                        <span className='text-detail'>{hiddenEmail}</span>
                                    </div>
                                    <div className='description card-information-detail'>
                                        <span>Phone:</span>
                                        <span className='text-detail'>{hiddenPhone}</span>
                                    </div>
                                    <div className='description card-information-detail mb-5'>
                                        <span>Birthday:</span>
                                        <span className='text-detail'>{currentUser?.user.birthday}</span>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className='card-skills my-4'>
                                    <div className='skills card-information-tittle items-center'>
                                        <em>Skills</em>
                                        <Button
                                            onClick={showModal}
                                            className='button-edit'>
                                            <i className="fa-solid fa-pencil"></i>
                                        </Button>
                                    </div>
                                    <div className='skills card-information-detail mb-5'>
                                        <span className='text-detail'>

                                            {
                                                currentUser?.user.skill.length > 1 ? (currentUser.user.skill.join(', ')) : (currentUser.user.skill.join())}</span>
                                    </div>
                                </div>

                                {/* Certification */}
                                <div className='card-certifications my-4'>
                                    <div className='certification card-information-tittle items-center'>
                                        <em>Certification</em>
                                        <Button
                                            className='button-edit'
                                            onClick={showModal}
                                        >
                                            <i className="fa-solid fa-pencil"></i>
                                        </Button>
                                    </div>
                                    <div className='certification card-information-detail mb-5'>
                                        <span className='text-detail'>{currentUser?.user.certification.length > 1 ? (currentUser.user.certification.join(', ')) : (currentUser.user.certification.join())}</span>
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className='card-languages'>
                                    <div className='languages card-information-tittle items-center'>
                                        <em>Languages</em>
                                        <Button
                                            className='button-edit'
                                            onClick={showModal}
                                        >
                                            <i className="fa-solid fa-pencil"></i>
                                        </Button>
                                    </div>
                                    <div className='languages card-information-detail mb-5'>
                                        <span className='text-detail'>English - <span className='languages-basic'>Basic</span></span>
                                    </div>
                                </div>

                                {/* Linked */}
                                <div className='linked card-information-tittle items-center my-4'>
                                    <em>Linked Accounts</em>
                                    <Button className='button-edit'>
                                        <i className="fa-solid fa-pencil"></i>
                                    </Button>
                                </div>
                                <div className='card-linked'>

                                    <div className="linked-items linked-items-facebook">
                                        <div>
                                            <i className="fa-brands fa-facebook mx-1"></i>
                                            <span>Facebook</span>
                                        </div>
                                        <i className="fa-solid fa-plus mx-1"></i>
                                    </div>

                                    <div className="linked-items linked-items-google">
                                        <div>
                                            <i className="fa-brands fa-google mx-1"></i>
                                            <span>Google</span>
                                        </div>
                                        <i className="fa-solid fa-plus mx-1"></i>
                                    </div>

                                    <div className="linked-items linked-items-github">
                                        <div>
                                            <i className="fa-brands fa-github mx-1"></i>
                                            <span>Github</span>
                                        </div>
                                        <i className="fa-solid fa-plus mx-1"></i>
                                    </div>

                                    <div className="linked-items linked-items-twitter">
                                        <div>
                                            <i className="fa-brands fa-twitter mx-1"></i>
                                            <span>Twitter</span>
                                        </div>
                                        <i className="fa-solid fa-plus mx-1"></i>
                                    </div>

                                    <div className="linked-items linked-items-dribbble">
                                        <div>
                                            <i className="fa-brands fa-dribbble mx-1"></i>
                                            <span>Dirbble</span>
                                        </div>
                                        <i className="fa-solid fa-plus mx-1"></i>
                                    </div>

                                    <div className="linked-items linked-items-stack-overflow">
                                        <div>
                                            <i className="fa-brands fa-stack-overflow mx-1"></i>
                                            <span>Stack Overflow</span>
                                        </div>
                                        <i className="fa-solid fa-plus mx-1"></i>
                                    </div>
                                    <div className="linked-items"></div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="profile-right lg:col-span-2 md:col-span-1 my-10 lg:ml-12 md:px-3">
                        <Card
                            className='card-right w-full'
                        >
                            <div>
                                <svg width="352" height="104" viewBox="0 0 252 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M250.641 96.0005H0.874023V102.711H250.641V96.0005Z" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M195.334 0.822754H110.963L92.077 95.9933H176.448L195.334 0.822754Z" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M98.027 66.0029H182.398" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M77.8599 84.1191H15.3289V96.0006H77.8599V84.1191Z" fill="#222325" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M81.2271 74.4419H18.6961V84.1192H81.2271V74.4419Z" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M72.4349 59.8315H12.4169V74.4419H72.4349V59.8315Z" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M76.4811 50.5669H16.4631V59.8383H76.4811V50.5669Z" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M52.2679 59.8315V74.4419" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M59.1 59.8315V74.4419" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M59.0999 59.8315H52.2679V74.4419H59.0999V59.8315Z" fill="#222325" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M22.749 55.1992H69.831" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M196.202 69.8657H229.473V79.3541C229.473 83.7653 227.72 87.9959 224.6 91.1151C221.479 94.2343 217.247 95.9867 212.834 95.9867V95.9867C208.422 95.9848 204.192 94.2317 201.073 91.1126C197.954 87.9936 196.202 83.7641 196.202 79.3541V69.8657Z" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M229.473 79.354C229.473 83.764 227.721 87.9935 224.602 91.1126C221.483 94.2316 217.253 95.9848 212.841 95.9866V95.9866C208.428 95.9866 204.196 94.2343 201.075 91.115C197.955 87.9958 196.202 83.7652 196.202 79.354" fill="#222325"></path><path d="M229.473 79.354C229.473 83.764 227.721 87.9935 224.602 91.1126C221.483 94.2316 217.253 95.9848 212.841 95.9866V95.9866C208.428 95.9866 204.196 94.2343 201.075 91.115C197.955 87.9958 196.202 83.7652 196.202 79.354" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M235.416 82.0409C238.532 82.0409 241.058 79.5159 241.058 76.4011C241.058 73.2863 238.532 70.7612 235.416 70.7612C232.3 70.7612 229.774 73.2863 229.774 76.4011C229.774 79.5159 232.3 82.0409 235.416 82.0409Z" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M206.751 64.2257C208.235 62.5883 207.787 60.0623 206.751 57.0954C206.403 55.9619 206.371 54.7548 206.658 53.6043C206.945 52.4539 207.542 51.4037 208.382 50.5669" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M214.192 64.1067C214.64 61.5806 216.866 59.0616 215.382 55.7939C213.898 52.5261 211.812 51.1896 212.708 46.2915" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M219.967 63.4768C219.673 61.6994 220.772 60.356 221.451 57.8789C221.653 57.0598 221.688 56.2085 221.555 55.3755C221.421 54.5425 221.122 53.7448 220.674 53.0298" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M114.445 85.8049C117.764 82.7671 118.388 78.0494 115.84 75.2677C113.292 72.486 108.536 72.6936 105.217 75.7314C101.898 78.7693 101.274 83.487 103.822 86.2687C106.37 89.0504 111.126 88.8428 114.445 85.8049Z" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M125.558 77.8633H150.289" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M124.606 83.2725H141.763" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M167.53 74.3018L168.93 78.3602C168.941 78.364 168.954 78.364 168.965 78.3602L173.347 79.095C173.396 79.095 173.403 79.1649 173.347 79.1999L169.553 82.4467C169.549 82.4651 169.549 82.4842 169.553 82.5026L169.455 87.0159C169.455 87.0649 169.392 87.1069 169.35 87.0789L165.633 85.0287H165.577L161.132 87.0789C161.124 87.0891 161.112 87.0956 161.098 87.0969C161.085 87.0982 161.072 87.0942 161.062 87.0859C161.052 87.0775 161.045 87.0655 161.044 87.0523C161.043 87.0392 161.047 87.0261 161.055 87.0159L162.546 82.5026C162.553 82.4846 162.553 82.4647 162.546 82.4467L159.9 79.2349C159.894 79.2251 159.891 79.214 159.89 79.2026C159.89 79.1912 159.892 79.1798 159.897 79.1694C159.901 79.1591 159.909 79.1501 159.918 79.1432C159.927 79.1363 159.938 79.1317 159.949 79.1299L164.59 78.3952C164.608 78.4007 164.628 78.4007 164.646 78.3952L167.446 74.3368C167.453 74.2528 167.516 74.2528 167.53 74.3018Z" fill="#1DBF73" stroke="#1DBF73" stroke-miterlimit="10"></path><path d="M104.537 33.1716C109.381 28.1475 128.435 17.7775 140.685 30.7156C152.935 43.6536 161.3 44.2134 171.8 38.9794C182.3 33.7454 188.523 35.3058 188.523 35.3058" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M173.662 0.822754C173.662 0.822754 147.062 35.5364 185.562 49.8949" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M137.859 28.4066C141.674 24.9146 142.392 19.4915 139.462 16.2937C136.533 13.0958 131.066 13.3342 127.251 16.8262C123.436 20.3181 122.718 25.7413 125.647 28.9391C128.577 32.137 134.044 31.8986 137.859 28.4066Z" fill="#222325" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M120.217 46.8441C123.241 54.7301 133.398 58.1727 142.897 54.5411C152.396 50.9095 157.66 41.5681 154.636 33.6611L120.217 46.8441Z" stroke="#222325" stroke-width="1.5" stroke-miterlimit="10">

                                    </path>
                                </svg>
                            </div>

                            <h1 className='tittle-right lg:text-xl sm:text-lg font-bold my-3'>Ready to earn on your own terms?</h1>
                            <button className=''>Became a seller</button>
                        </Card>
                    </div>
                </div>
                <div className='modal-edit'>
                    {handlerModal()}
                </div>

            </div>
        </>

    )
}
