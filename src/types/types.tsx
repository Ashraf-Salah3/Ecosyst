export interface WorksFilterProps{
    PageIndex?: number,
    PageSize?: number,
    CategoryId?: number,
}

export interface WorksPageProps{
    id:number;
    name:string;
    description:string;
    projectLink:string;
    attachment:string;
    categoryId:string;
    categoryName:string
}

export interface CategoryPageProps {
    id:number,
    name:string
}


export  interface ServicesProps {
    id:number
    clientName:string;
    phone:string
    website:string;
    marketingMemeber:string
}

export interface CoursesPageProps {
    id:number;
    title:string;
    description:string;
    price:string;
    duration:string;
    attachment:string;
    courseMaterials:string;
    material:string
}

export interface LoginPageProps {
    email:string,
    password:string
}

export interface MaterialType{
    id:number,
    title:string;
    courseId:string;
    attachment:string;
    courseName:string
    description:string
}