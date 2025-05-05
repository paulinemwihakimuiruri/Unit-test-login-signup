const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const submitForm = async (email, password) => {
    if (!validateEmail(email)){
        throw new Error("Invalid email format");
    }

const res = await fetch ('/api/signup' , {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password}),
});

if (!Response.ok) {
    throw new Error("Signup failed");
}
return res.json();
};

module.exports = { validateEmail, submitForm};

// const data = await res.json();
// alert(data.message);
// if (res.ok) window.location.href = 'login.html';
// };

