'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { EnvelopeSimple, Phone, PaperPlaneTilt } from '@phosphor-icons/react'
import { client } from '@/sanity/lib/client'

interface SiteConfig {
  email: string
  phone: string
  businessHours: string[]
  whyChooseUs: string[]
}

type SiteConfigResponse = Partial<SiteConfig> | null

const fallbackConfig: SiteConfig = {
  email: 'info@caprichoazahar.es',
  phone: '+34 123 456 789',
  businessHours: ['Lunes a Viernes: 9:00 - 18:00', 'Sábados: 10:00 - 14:00'],
  whyChooseUs: [
    'Diseños 100% personalizados',
    'Materiales de alta calidad',
    'Entrega rápida en toda España',
    'Asesoramiento personalizado',
  ],
}

const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido'),
  projectType: z.string().min(1, 'Selecciona un tipo de proyecto'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [config, setConfig] = useState<SiteConfig>(fallbackConfig)

  const normalizeConfig = (data: SiteConfigResponse): SiteConfig => ({
    email: data?.email || fallbackConfig.email,
    phone: data?.phone || fallbackConfig.phone,
    businessHours: Array.isArray(data?.businessHours)
      ? data.businessHours
      : fallbackConfig.businessHours,
    whyChooseUs: Array.isArray(data?.whyChooseUs)
      ? data.whyChooseUs
      : fallbackConfig.whyChooseUs,
  })

  useEffect(() => {
    client
      .fetch<SiteConfigResponse>(`*[_type == "siteConfig"][0]{ email, phone, businessHours, whyChooseUs }`)
      .then((data) => {
        setConfig(normalizeConfig(data))
      })
      .catch(() => {})
  }, [])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted:', data)
    
    toast.success('¡Mensaje enviado!', {
      description: 'Nos pondremos en contacto contigo pronto.'
    })
    
    form.reset()
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contacta con Nosotros
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cuéntanos tu idea y te ayudaremos a hacerla realidad
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <Card className="p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <EnvelopeSimple size={24} className="text-primary" weight="duotone" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{config.email}</p>
                    </div>
                  </Card>

                  <Card className="p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Phone size={24} className="text-accent" weight="duotone" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Teléfono</p>
                      <p className="font-semibold">{config.phone}</p>
                    </div>
                  </Card>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Horario de Atención</h4>
                <p className="text-muted-foreground">
                  {config.businessHours.map((line, i) => (
                    <span key={i}>{line}{i < config.businessHours.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">¿Por qué elegirnos?</h4>
                <ul className="space-y-2 text-muted-foreground">
                  {config.whyChooseUs.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 shadow-xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Tu nombre" 
                            id="name"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="tu@email.com"
                            id="email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="123 456 789"
                            id="phone"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de proyecto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger id="project-type">
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cofradias">Cofradías</SelectItem>
                            <SelectItem value="fiestas">Fiestas Infantiles</SelectItem>
                            <SelectItem value="merchandising">Merchandising</SelectItem>
                            <SelectItem value="regalos">Regalos Personalizados</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Cuéntanos sobre tu proyecto..."
                            className="min-h-32 resize-none"
                            id="message"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        Enviar Mensaje
                        <PaperPlaneTilt className="ml-2" weight="bold" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
