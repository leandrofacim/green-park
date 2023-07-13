import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Lote from './lote'

@Entity('boletos')
export default class Boleto {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    nome_sacado!: string

  @Column()
    valor!: number

  @Column()
    linha_digitavel!: string

  @Column()
    ativo!: boolean

  @CreateDateColumn()
    created_at!: Date

  @UpdateDateColumn()
    updated_at!: Date

  @ManyToOne(() => Lote, (lote) => lote.boletos)
  @JoinColumn({ name: 'lote' })
    lote!: Partial<Lote>
}
