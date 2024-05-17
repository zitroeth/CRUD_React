export default function useAuthHeader() {
    const token = localStorage.getItem('token');

    return {
        headers: token? { Authorization: `Bearer ${token}` } : {},
    };
}