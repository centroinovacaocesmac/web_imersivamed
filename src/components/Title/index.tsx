interface TitleProps {
    name?: string;
}

export default function Title({name}: TitleProps){
    return <h1 className="text-blackColor1 text-3xl font-semibold font-Poppins">{name}</h1>
}