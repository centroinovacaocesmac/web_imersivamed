import DoctorComputer from "@assets/Images/computer_doctor.svg"

export default function Banner(){
    return(
        <div className="bg-mainColor flex flex-row justify-around items-center px-10 py-6 rounded">
            <div className="flex flex-col gap-4">
                <h1 className="text-white text-lg lg:text-2xl font-semibold font-Poppins">Bem-vindo ao Painel de Controle do App ImersivaMed!</h1>
                <p className="text-white text-sm lg:text-base font-normal font-Poppins lg:max-w-[600px]">
                    Centralize o gerenciamento de conteúdos, exercícios e avaliações em um único ambiente intuitivo. Organize e atualize seu material com praticidade e mantenha a qualidade do aprendizado sempre em alta.
                </p>
            </div>
            <div>
                <img src={DoctorComputer} alt="Ilustração"  className="hidden lg:block w-64"/>
            </div>
        </div>
    )
}