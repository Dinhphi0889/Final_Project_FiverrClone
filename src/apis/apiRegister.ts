import api from "./apiUtil"
export const apiRegister = async (data: {
    id: Number,
    name: String,
    email: String,
    password: String,
    phone: String,
    birthday: String,
    gender: Boolean,
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
        return response.data.content
    }
    catch (error: any) {
        throw Error(error)
    }
}