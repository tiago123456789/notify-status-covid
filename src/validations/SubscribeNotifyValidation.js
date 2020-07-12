module.exports = (datas) => {
    const errors = [];
    if (!datas.email || datas.email.trim() == 0) {
        errors.push("The field email is required.");
    }

    if (!datas.whatsapp || datas.whatsapp.trim() == 0) {
        errors.push("The field whatsapp is required.")
    }

    if (!datas.city || datas.city.trim() == 0) {
        errors.push("The field city is required.")
    }

    if (!datas.name || datas.name.trim() == 0) {
        errors.push("The field name is required.")
    }

    return errors;
}