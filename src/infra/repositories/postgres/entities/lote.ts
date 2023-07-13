import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Boleto from './boleto'

@Entity('lotes')
export default class Lote {
  @PrimaryGeneratedColumn()
    id!: string

  @Column()
    nome!: string

  @OneToMany(() => Boleto, (boleto) => boleto.lote)
    boletos!: Boleto[]
}
