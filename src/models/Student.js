import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    // Identificación interna
    matriculaCorrelativo: {
      type: String,
      required: true,
      unique: true, // asume que no se repite
      trim: true,
    },
    numeroLista: {
      type: Number,
      required: true,
    },

    // IDENTIFICACIÓN DEL ALUMNO
    runIpe: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    apellidos: {
      type: String,
      required: true,
      trim: true,
    },
    nombres: {
      type: String,
      required: true,
      trim: true,
    },
    genero: {
      type: String,
      enum: ['F', 'M'],
      required: true,
    },
    prioridad: {
      type: String,
      enum: ['Prioritario', 'Preferente', 'Nada'],
      default: 'Nada',
      required: true,
    },
    domicilio: {
      type: String,
      trim: true,
    },
    comuna: {
      type: String,
      trim: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    edadAl31Marzo: {
      type: Number,
      min: 3,
      required: true,
    },
    nacionalidad: {
      type: String,
      trim: true,
    },

    // ANTECEDENTES ESCOLARES
    nivel: {
      type: String,
      required: true,
      trim: true,
    },
    curso: {
      type: String,
      required: true,
      trim: true,
    },
    fechaIngreso: {
      type: Date,
      default: Date.now,
    },
    escuelaProcedencia: {
      type: String,
      trim: true,
    },
    necesidadesEducativasEspeciales: {
      type: Boolean,
      default: false,
    },
    diagnostico: {
      type: String,
      trim: true,
    },
    cursosRepetidos: {
      type: Number,
      default: 0,
      min: 0,
    },
    fechaRetiro: {
      type: Date,
      default: null,
    },
    causalRetiro: {
      type: String,
      trim: true,
    },

    // ANTECEDENTES FAMILIARES
    nivelEducacionalPadre: {
      type: String,
      trim: true,
    },
    nivelEducacionalMadre: {
      type: String,
      trim: true,
    },
    personasConQuienVive: {
      type: String,
      enum: ['Madre', 'Padre', 'Ambos padres', 'Familiar', 'Otros'],
    },
    apoderadoNombre: {
      type: String,
      trim: true,
    },
    apoderadoRunIpa: {
      type: String,
      trim: true,
    },
    apoderadoDomicilio: {
      type: String,
      trim: true,
    },
    contactoEmergencia1: {
      type: String,
      trim: true,
    },
    contactoEmergencia2: {
      type: String,
      trim: true,
    },
    observaciones: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // crea createdAt y updatedAt
  }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;
