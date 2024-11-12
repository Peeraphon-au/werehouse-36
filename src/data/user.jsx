const users = [
    {
        user: 'manager@werehouse.com',
        pass: 'manager',
        role: 'admin',
        token: 'admin'
    },
    {
        user: 'employee@werehouse.com',
        pass: 'employee',
        role: 'user',
        token: 'user'
    }
]

export function verifyUser(user, pass) {
    const userFound = users.find((u) => {
        return u.user === user && u.pass === pass
    })

    return userFound ? {
        role: userFound.role, token: userFound.
            token
    } : null
}