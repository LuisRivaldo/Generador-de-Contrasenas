import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2Icon } from "lucide-react"
import { DeletePasswordAction } from "../_actions/delete_password.action"
import { id } from "zod/v4/locales"
import { toast } from "sonner"

interface Props {
    id: string
}

export function PasswordDeleteDialog({ id }: Props) {

  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: (id: string) => DeletePasswordAction(id),
    async onSuccess(data){
        toast.success(`Contraseña ${data.title} ha sido eliminada`)

        queryClient.invalidateQueries({
          queryKey: ["passwords"]
    })
    },
    onError(){
        toast.error("Ha ocurrido un error")
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
            <Trash2Icon/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de querer eliminar esta contraseña?</AlertDialogTitle>
          <AlertDialogDescription>
            Al eliminar esta contraseña no podrás recuperarla
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => {mutate(id)}} disabled={isPending}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PasswordDeleteDialog