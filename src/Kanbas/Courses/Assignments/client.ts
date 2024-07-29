import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios
        .get(`${ASSIGNMENTS_API}/${courseId}`);
    // console.log(REMOTE_SERVER);
    return response.data;
};

export const updateAssignment = async (assignment: any) => {
    const response = await axios.
    put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios
        .delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};

export const createAssignment = async (assignment: any) => {
    const response = await axios.post( `${ASSIGNMENTS_API}/${assignment.course}`, assignment );
    return response.data;
};



