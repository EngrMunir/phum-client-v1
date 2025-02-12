import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { semesterOptions } from "../../../constants/semester";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";

const nameOptions =[
    {
        value:'01',
        label:'Autumn'
    },
    {
        value:'02',
        label:'Summer'
    },
    {
        value:'03',
        label:'Fall'
    },
]

const CreateAcademicSemester = () => {
    const onSubmit:SubmitHandler<FieldValues> =(data)=>{
        const name = nameOptions[Number(data.name)-1]?.label;
        const semesterData={
            name,
            code:data.name,
            year:data.year
        }
        console.log(semesterData)
    };
    const currentYear = new Date().getFullYear();
    const yearOptions =[0,1,2,3,4].map(number =>({
        value:String(currentYear+number),
        label:String(currentYear+number),
    }));

  return (
    <Flex justify="center" align="center">
        <Col span={6}>
            <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
                <PHSelect label="Name" name="name" options={semesterOptions}/>
                <PHSelect label="Year" name="year" options={yearOptions}/>
                <PHSelect label="Start Month" name="startMonth" options={monthOptions}/>
                <PHSelect label="End Month" name="endMonth" options={monthOptions}/>
                <Button htmlType="submit">Submit</Button>
            </PHForm>
        </Col>
    </Flex>
  )
};

export default CreateAcademicSemester;