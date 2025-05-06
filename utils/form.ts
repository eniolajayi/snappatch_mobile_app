import { isAxiosError } from 'axios';
import { toast } from 'burnt';

export const handleMutationError = (err: Error) => {
    console.log(err);
    if (isAxiosError(err)) {
        console.log(err.response?.data);
        toast({
            title:
                `${JSON.stringify(err.response?.data.message)}` ||
                "An error occured",
        });
    }
}

/* 
 'submitted',
  'in_progress',
  'resolved',
  'invalid'
 */

export const getColorByStatus = (status?: string): string => {
    switch (status) {
        case "submitted":
            return "#e5e5e5";
        case "in_progress":
            return "#ffab00";
        case "resolved":
            return "#a5d6a7";
        case "invalid":
            return "#ef9a9a";
        default:
            return "#e0e0e0";
    }
};