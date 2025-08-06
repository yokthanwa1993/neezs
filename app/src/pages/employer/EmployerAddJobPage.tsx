import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const jobSchema = z.object({
  title: z.string().min(3, { message: 'กรุณากรอกชื่อตำแหน่งงานอย่างน้อย 3 ตัวอักษร' }),
  jobType: z.string({ required_error: 'กรุณาเลือกประเภทงาน' }),
  salary: z.string().min(1, { message: 'กรุณากรอกอัตราค่าจ้าง' }),
  location: z.string().min(3, { message: 'กรุณากรอกสถานที่' }),
  description: z.string().min(10, { message: 'กรุณากรอกรายละเอียดงานอย่างน้อย 10 ตัวอักษร' }),
  requirements: z.array(z.object({ value: z.string().min(1, { message: 'คุณสมบัติไม่สามารถเว้นว่างได้' }) })).optional(),
});

const EmployerAddJobPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      salary: '',
      location: '',
      description: '',
      requirements: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "requirements"
  });

  const onSubmit = (values: z.infer<typeof jobSchema>) => {
    console.log(values);
    navigate('/verify-phone');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>สร้างประกาศงานใหม่</CardTitle>
          <CardDescription>กรอกรายละเอียดด้านล่างเพื่อประกาศหางานใหม่ของคุณ</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อตำแหน่งงาน</FormLabel>
                    <FormControl>
                      <Input placeholder="เช่น พนักงานเสิร์ฟ, พนักงานทำความสะอาด" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ประเภทงาน</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกประเภทงาน" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="part-time">พาร์ทไทม์</SelectItem>
                        <SelectItem value="full-time">งานประจำ</SelectItem>
                        <SelectItem value="freelance">ฟรีแลนซ์</SelectItem>
                        <SelectItem value="internship">ฝึกงาน</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อัตราค่าจ้าง</FormLabel>
                    <FormControl>
                      <Input placeholder="เช่น 150 บาท/ชั่วโมง, 20,000 บาท/เดือน" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>สถานที่</FormLabel>
                    <FormControl>
                      <Input placeholder="เช่น สยามสแควร์, ลาดพร้าว" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รายละเอียดงาน</FormLabel>
                    <FormControl>
                      <Textarea placeholder="อธิบายลักษณะงานที่ต้องทำ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>คุณสมบัติที่ต้องการ</FormLabel>
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`requirements.${index}.value`}
                    render={({ field: itemField }) => (
                      <FormItem className="flex items-center space-x-2 mt-2">
                        <FormControl>
                          <Input placeholder={`คุณสมบัติข้อที่ ${index + 1}`} {...itemField} />
                        </FormControl>
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ value: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" /> เพิ่มคุณสมบัติ
                </Button>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                สร้างประกาศงาน
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerAddJobPage;