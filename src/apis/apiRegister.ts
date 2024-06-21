import api from "./apiUtil"
export const apiRegister = async (data: {
    id: Number,
    name: String,
    email: String,
    password: String,
    phone: String,
    birthday: String,
    gender: Boolean,
    // confirm:String,
    role: 'USER',
    skill: [
        ''
    ],
    centification: [
        ''
    ]

}) => {
    try {
        const response = await api.post('auth/signup/', data)
        console.log(response)
    }
    catch (error: any) {
        console.log(error)
        throw Error(error)
    }
}