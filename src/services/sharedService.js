import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export function messageAlert(type, msg) {
    Swal.fire({
        icon: type,
        text: msg,
    })
}


