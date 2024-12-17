import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjetDto } from './dto/create-projet.dto';
import { UpdateProjetDto } from './dto/update-projet.dto';
import { Projet, ProjetDocument } from './entities/projet.entity';


@Injectable()
export class ProjetService {

  constructor(
    @InjectModel(Projet.name) private readonly projetModel: Model<ProjetDocument>,
  ) { }

  // Create a new Projet
  async create(createProjetDto: CreateProjetDto): Promise<Projet> {
    // Create a new Projet and save to the database
    const createdProjet = new this.projetModel(createProjetDto);  // Use the Projet model
    return await createdProjet.save();  // Save the Projet
  }
  
  async findAll(): Promise<Projet[]> {
    return await this.projetModel.find().exec(); // Retrieve all Projets from MongoDB
  }

  async findOne(id: string): Promise<Projet> {
    const projet = await this.projetModel.findById(id).exec();
    if (!projet) {
      throw new NotFoundException('projet with this ID not found');
    }
    return projet;
  }
  
  
  async findByUserId(userId: string): Promise<Projet[]> {
    return await this.projetModel.find({ userId }).exec(); // Filter projects by userId
  }


  async findAllByUserId(userId:string): Promise<Projet[]> {
    return await this.projetModel.find({ userId }).exec(); // Retrieve all Projets from MongoDB
  }
  async findOneBy(username: string): Promise<{ id: string }> {
    const projet = await this.projetModel.findOne({ username }).exec();
    
    if (!projet) {
      throw new NotFoundException('Projet with this ID not found');
    }
  
    return { id: projet._id.toString() }; 
  }
  async findOneByUser(username: string): Promise<Projet>  {
    const projet = await this.projetModel.findOne({ username }).exec();
    
    if (!projet) {
      throw new NotFoundException('Projet with this ID not found');
    }
  
    return projet; 
  }

  async update(id: string, updateProjetDto: UpdateProjetDto): Promise<Projet> {
    const updatedProjet = await this.projetModel.findByIdAndUpdate(id, updateProjetDto, { new: true }).exec();
    if (!updatedProjet) {
      throw new NotFoundException('Projet not found');
    }
    return updatedProjet;
  }

  async remove(id: string): Promise<Projet> {
    
    const deletedProjet = await this.projetModel.findByIdAndDelete(id).exec();
    if (!deletedProjet) {
      throw new NotFoundException('Projet not found');
    }
    return deletedProjet;
  }
 
  async saveProject(userId: string, projectId: string): Promise<any> {
    const project = await this.projetModel.findById(projectId);
  
    if (!project) {
      throw new Error('Project not found');
    }
  
    // Add the user ID to `savedBy` if not already saved
    if (!project.savedBy.includes(userId)) {
      project.savedBy.push(userId);
      await project.save();
    }
  
    return project;
  }
  async unsaveProject(userId: string, projectId: string): Promise<any> {
    const project = await this.projetModel.findById(projectId);
  
    if (!project) {
      throw new Error('Project not found');
    }
  
    // Remove the user ID from `savedBy`
    project.savedBy = project.savedBy.filter((id) => id !== userId);
    await project.save();
  
    return project;
  }
  
  async getSavedProjects(userId: string): Promise<any> {
    const projects = await this.projetModel.find({ savedBy: userId });
    return projects;
  } 
  
}
